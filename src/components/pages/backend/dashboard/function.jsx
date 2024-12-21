export const getRecipeByCategory = (categoryId, dataRecipe) => {
  let result = [];

  dataRecipe?.data.map((item) => {
    if (Number(categoryId) === Number(item.category_aid)) {
      result.push(item);
    }
  });

  return result;
};

export const getCategory = (dataCategory, dataRecipe) => {
  let result = [];
  let resultCategoryId = [];

  dataCategory?.data.map((categoryItem) => {
    let isResultCategoryExist = false;
    dataRecipe?.data.map((recipeItem) => {
      //boolean check if category exist in result category array
      isResultCategoryExist = resultCategoryId.includes(
        Number(categoryItem.category_aid)
      );

      //get index of existing category
      const getIndexCategoryItem = resultCategoryId.indexOf(
        recipeItem.recipe_category_id
      );

      //if category not exist and category with level
      if (
        Number(categoryItem.category_aid) ===
          Number(recipeItem.recipe_category_id) &&
        isResultCategoryExist === false
      ) {
        resultCategoryId.push(categoryItem.category_aid);
        result.push({
          ...categoryItem,
          recipe_level: Number(recipeItem.recipe_level_id),
        });
      }
    });
    if (!isResultCategoryExist) {
      result.push({ ...categoryItem, recipe_level: 0 });
      resultCategoryId.push(categoryItem.category_aid);
    }
  });
  return result;
};

export const getLevel = (dataCategory, dataLevel, dataRecipe) => {
  let resultLevel = [];
  let resultLevelId = [];
  let resultCategoryId = [];

  dataCategory?.data.map((categoryItem) => {
    
    resultLevel.push(categoryItem);
    resultCategoryId.push(categoryItem.category_aid);
  });

  dataLevel?.data.map((levelItem) => {
    const getLevelName = levelItem.level_title.toLowerCase();
    resultLevel.map((item, key) => {
      const object = {
        [getLevelName]: 0,
      };
      resultLevel[key] = { ...resultLevel[key], ...object };
      resultLevelId[levelItem.level_aid] = levelItem.level_title.toLowerCase();
    });
  });
  dataRecipe?.data.map((recipeItem) => {
    const recipeLevelId = recipeItem.recipe_level_id;
    const recipeCategoryId = recipeItem.recipe_category_id;
    
    const levelName = resultLevelId[recipeLevelId];

    resultLevel.map((category) => {
      if (category.category_aid === recipeCategoryId && levelName) {
        if (category[levelName] !== undefined) {
          category[levelName] += 1;
        }
      }
    });

  });
  return resultLevel;
};
