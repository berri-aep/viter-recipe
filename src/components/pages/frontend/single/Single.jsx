import React from "react";
import Headings from "../Headings";
import Footnote from "../Footnote";
import { imgPath } from "@/components/helpers/functions-general";
import { Clock, Dot, HandPlatter, Utensils } from "lucide-react";

const Single = () => {
  return (
    <>
      <Headings />
      <section className="bg-dark text-white">
        <div className="container">
          <div className="py-25">
            <img
              src={`${imgPath}/truffle2.jpg`}
              alt=""
              className="h-[500px] w-full object-cover"
            />
          </div>
          <div className="text-center py-10">
            <h1>Creamy Truffle Pasta</h1>

            <ul className="flex gap-5 mb-5 justify-center">
              <li className="flex gap-2 items-center">
                <Clock /> 30mins
              </li>
              <li className="flex gap-2 items-center">
                <Utensils /> 4 servings
              </li>
              <li className="flex gap-2 items-center">
                <HandPlatter /> Pasta
              </li>
            </ul>
            <p className="max-w-[600px] mx-auto">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem doloremque vel neque tempora laboriosam sed nulla
              fuga quos eos et!
            </p>
            <div className=" text-left grid grid-cols-[1.5fr_3fr] gap-10 max-w-[900px] mx-auto mt-10">
              <div>
                <h3>Ingredients</h3>
                {Array.from(Array(8).keys()).map((key) => (
                  <div className="flex gap-2">
                    <Dot />
                    <ul
                      className="grid grid-cols-[0.3fr,_1fr] mb-2 basis-full"
                      key={key}
                    >
                      <li>
                        <span>1</span> Cup
                      </li>
                      <li>Sugar</li>
                    </ul>
                  </div>
                ))}
              </div>

              <div>
                <h3>Instructions</h3>
                <div className="wrapper-instruction">
                  <h5>Step1</h5>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Iste, ducimus!
                  </p>

                  <h5>Step 2</h5>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Veritatis cum hic aperiam laboriosam commodi nesciunt!
                  </p>

                  <h5>Step 3</h5>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Eveniet quaerat officiis corporis quasi perferendis in ea
                    iste incidunt ratione.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footnote />
    </>
  );
};

export default Single;
