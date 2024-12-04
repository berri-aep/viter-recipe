import { imgPath } from "@/components/helpers/functions-general";
import { Link } from "react-router-dom";
import React from "react";

const LatestRecipe = ({result}) => {
   const allRecent = result?.data.filter((item) => {
     return (
       Math.floor(
         Math.abs(new Date(item.recipe_created) - new Date()) /
           (1000 * 60 * 60 * 24)
       ) < 10
     );
   });

   
  return (
    <>
      <section className="py-24 bg-dark">
        <div className="container">
          <h2 className="text-white">Latest Recipes</h2>

          <div className="grid grid-container gap-5">
            {allRecent?.slice(0,6).map((item, key) => (
              <div
                className={`grid-item relative h-full w-full bg-black group grid-name-${key} overflow-hidden transition-all duration-200`}
                key={key}
              >
                <img
                  src={`${imgPath}/${item.recipe_image}`}
                  alt=""
                  className="h-full w-full object-cover ktransition-all group-hover:opacity-70 group-hover:scale-[1.3] group-hover:rotate-[10deg] duration-200"
                />
                <div className="absolute -bottom-32 opacity-0 left-5 text-white bg-dark bg-opacity-60 p-5 group-hover:bottom-5 group-hover:opacity-100 transition-all duration-300">
                  <ul className="text-sm flex gap-5 items-center">
                    <li>{item.recipe_prep_time}</li>
                    <li>{item.recipe_serving} servings</li>
                  </ul>
                  <h4 className="mb-2 font-light">{item.recipe_title}</h4>
                  <Link to="/" className="font-bold">
                    View Recipe
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default LatestRecipe;
