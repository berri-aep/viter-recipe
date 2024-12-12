import React from "react";
import ModalWrapper from "../partials/Modals/ModalWrapper";
import SpinnerButton from "../partials/spinners/SpinnerButton";
import { ImagePlusIcon, Minus, Plus, X } from "lucide-react";
import {
  InputPhotoUpload,
  InputSelect,
  InputText,
  InputTextArea,
} from "@/components/helpers/FormInputs";
import { StoreContext } from "@/components/store/storeContext";
import { setIsAdd } from "@/components/store/storeAction";
import { Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "Yup";
import { queryData } from "@/components/helpers/queryData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUploadPhoto from "@/components/custom-hook/useUploadPhoto";
import { imgPath } from "@/components/helpers/functions-general";
import useQueryData from "@/components/custom-hook/useQueryData";

const ModalAddRecipe = ({ itemEdit }) => {
  const { dispatch } = React.useContext(StoreContext);
  const handleClose = () => dispatch(setIsAdd(false));
    const [value, setValue] = React.useState("");

  const { uploadPhoto, handleChangePhoto, photo } =
    useUploadPhoto("/v2/upload-photo");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const {
    isFetching,
    error,
    data: categ,
    status,
  } = useQueryData(
    `/v2/category`, //endpoint
    "get", //method
    "category" //key
  );
  
  const {
    isFetchingLevel,
    errorLevel,
    data: level,
    LevelStatus,
  } = useQueryData(
    `/v2/level`, //endpoint
    "get", //method
    "level" //key
  );

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit ? `/v2/recipe/${itemEdit.recipe_aid}` : `/v2/recipe`,
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["recipe"],
      });

      // show error box
      if (data.success) {
        console.log("asd");
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
      } else {
        dispatch(setValidate(true));
        dispatch(setMessage(data.error));
      }
    },
  });

  const initVal = {
    recipe_title: itemEdit ? itemEdit.recipe_title : "",
    recipe_category_id: itemEdit ? itemEdit.recipe_category_id : "",
    recipe_level_id: itemEdit ? itemEdit.recipe_level_id : "",
    recipe_serving: itemEdit ? itemEdit.recipe_serving : "",
    recipe_prep_time: itemEdit ? itemEdit.recipe_prep_time : "",
    recipe_description: itemEdit ? itemEdit.recipe_description : "",
    recipe_instruction: itemEdit ? itemEdit.recipe_instruction : "",

    recipe_ingredients: itemEdit
      ? JSON.parse(itemEdit.recipe_ingredients)
      : [{ ingredients: "", amount: "", unit: "" }],
  };
  const yupSchema = Yup.object({
    recipe_title: Yup.string().required("required"),
    recipe_category_id: Yup.string().required("required"),
    recipe_level_id: Yup.string().required("required"),
    recipe_serving: Yup.string().required("required"),
    recipe_prep_time: Yup.string().required("required"),
    recipe_description: Yup.string().required("required"),
    recipe_instruction: Yup.string().required("required"),
  });

  return (
    <ModalWrapper>
      <div className="modal-main bg-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[1300px] w-full rounded-md border border-line">
        <div className="modal-header flex gap-2 p-2 items-center border-b border-line mb-2">
          <span className="text-body">Add Recipe</span>
          <button className="ml-auto" onClick={handleClose}>
            <X />
          </button>
        </div>
        <div className="modal-body p-2 py-4">
          <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values) => {
              mutation.mutate({
                ...values,
                recipe_image:
                  (itemEdit?.recipe_image === "" && photo) ||
                  (!photo && "") ||
                  (photo === undefined && "") ||
                  (photo && itemEdit?.recipe_image !== photo?.name)
                    ? photo?.name || ""
                    : itemEdit?.recipe_image || "",
              });
              uploadPhoto();
            }}
          >
            {(props) => {
              return (
                <Form>
                  <div className="grid grid-cols-[1fr_1.5fr_1.5fr] gap-5">
                    <div className="info">
                      <h3 className="mb-0">Information</h3>
                      <div className="input-wrap relative  group input-photo-wrap h-[150px] ">
                        {itemEdit === null && photo === null ? (
                          <div className="w-full  rounded-md flex justify-center items-center flex-col h-full">
                            <ImagePlusIcon
                              size={50}
                              strokeWidth={1}
                              className="opacity-20 group-hover:opacity-50 transition-opacity"
                            />
                            <small className="opacity-20 group-hover:opacity-50 transition-opacity">
                              Upload Photo
                            </small>
                          </div>
                        ) : (
                          <img
                            src={
                              photo
                                ? URL.createObjectURL(photo) // preview
                                : imgPath + "/" + itemEdit?.recipe_image // check db
                            }
                            alt="recipe photo"
                            className={`group-hover:opacity-30 duration-200 relative object-cover h-full w-full  m-auto ${
                              mutation.isPending
                                ? "opacity-40 pointer-events-none"
                                : ""
                            }`}
                          />
                        )}

                        <InputPhotoUpload
                          name="photo"
                          type="file"
                          id="photo"
                          accept="image/*"
                          title="Upload photo"
                          onChange={(e) => handleChangePhoto(e)}
                          onDrop={(e) => handleChangePhoto(e)}
                          className={`opacity-0 absolute top-0 right-0 bottom-0 left-0 rounded-full  m-auto cursor-pointer w-full h-full ${
                            mutation.isPending ? "pointer-events-none" : ""
                          }`}
                        />
                      </div>

                      <div className="input-wrap">
                        <InputText
                          label="Title"
                          name="recipe_title"
                          type="text"
                        />
                      </div>
                      <div className="input-wrap">
                        <InputSelect
                          label="Recipe Category"
                          name="recipe_category_id"
                          onChange={handleChange}
                        >
                          <option value="" hidden>
                            Select Category
                          </option>
                          {categ?.data.map((item, key) => {
                            return (
                              <>
                                {item.category_is_active === 1 && (
                                  <option key={key} value={item.category_aid}>
                                    {item.category_title}
                                  </option>
                                )}
                              </>
                            );
                          })}
                        </InputSelect>
                      </div>
                      <div className="input-wrap">
                        <InputSelect
                          label="Level"
                          name="recipe_level_id"
                          onChange={handleChange}
                        >
                          <option value="" hidden>
                            Select Level
                          </option>
                          {level?.data.map((item, key) => {
                            return (
                              <>
                                {item.level_is_active === 1 && (
                                  <option key={key} value={item.level_aid}>
                                    {item.level_title}
                                  </option>
                                )}
                              </>
                            );
                          })}
                        </InputSelect>
                      </div>

                      <div className="input-wrap">
                        <InputText
                          label="Serving"
                          name="recipe_serving"
                          type="text"
                        />
                      </div>
                      <div className="input-wrap">
                        <InputText
                          label="Prep Time"
                          name="recipe_prep_time"
                          type="text"
                        />
                      </div>
                    </div>

                    <div className="ingredient">
                      <FieldArray
                        name="recipe_ingredients"
                        render={({ push, remove }) => (
                          <div className="input-wrap">
                            <div className="flex justify-between items-center">
                              <h3 className="mb-0">Ingredients</h3>
                              <button
                                className="bg-accent text-[#652427] font-semibold  p-1 px-2 text-sm rounded-md"
                                onClick={() =>
                                  push({
                                    ingredients: "",
                                    amount: "",
                                    unit: "",
                                  })
                                }
                                type="button"
                              >
                                Add
                              </button>
                            </div>

                            <div className="overflow-y-auto custom-scroll max-h-[500px] h-full pr-2">
                              {props.values.recipe_ingredients.map(
                                (ingredients, index) => (
                                  <div
                                    className="grid grid-cols-[1fr,_.3fr,_.8fr_.2fr] gap-3 mt-3 "
                                    key={index}
                                  >
                                    <div>
                                      <label htmlFor="">Ingredients</label>
                                      <Field
                                        name={`recipe_ingredients[${index}].ingredients`}
                                      />
                                    </div>

                                    <div>
                                      <label htmlFor="">Amount</label>
                                      <Field
                                        name={`recipe_ingredients[${index}].amount`}
                                      />
                                    </div>

                                    <div>
                                      <label htmlFor="">Unit</label>
                                      <Field
                                        name={`recipe_ingredients[${index}].unit`}
                                      />
                                    </div>

                                    <button
                                      className="size-[33px] bg-accent text-white rounded-md center-all self-end"
                                      onClick={() => remove(index)}
                                    >
                                      <Minus />
                                    </button>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      />
                    </div>

                    <div className="instruction">
                      <div className="input-wrap">
                        <h3>Instruction</h3>
                        <InputTextArea
                          name="recipe_instruction"
                          className="overflow-y-auto custom-scroll !h-[310px] w-full rounded-md p-2 outline-none bg-primary border borderline resize-none text-body"
                        />
                      </div>
                      <div className="input-wrap">
                        <h3>Description</h3>
                        <InputTextArea
                          name="recipe_description"
                          className="overflow-y-auto custom-scroll !max-h-[120px] h-full w-full rounded-md p-2 outline-none bg-primary border borderline resize-none text-body"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-5">
                    <button className="btn btn-accent" type="submit">
                      {mutation.isPending && <SpinnerButton />}{" "}
                      {itemEdit ? "Save" : "Add"}
                    </button>
                    <button
                      className="btn btn-cancel"
                      type="reset"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ModalAddRecipe;
