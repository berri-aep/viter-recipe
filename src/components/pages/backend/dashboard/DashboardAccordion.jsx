import { ChevronDown, Dot } from "lucide-react";
import React from "react";
import IconNoData from "../partials/IconNoData";

const DashboardAccordion = ({ item, recipeItem, title }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  // const getCardDetails = menus.filter(
  //   (item) => item.menu_category === filterby
  // );

  const handleToggleOpen = () => setIsOpen((prev) => !prev);
  return (
    <>
      <div className="accordion mb-2">
        <div
          className="accordion-header p-2 flex justify-between bg-secondary items-center rounded-t-md cursor-pointer"
          onClick={handleToggleOpen}
        >
          <h6 className="mb-0">{item.category_title}</h6>
          <ChevronDown
            className={`transition-all duration-500 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
        <div
          className={`accordion-body border border-line rounded-b-md border-t-0 overflow-hidden max-h-0 h-full transition-all duration-500  ${
            isOpen ? "max-h-[600px] " : "max-h-0"
          }`}
        >
          <ul className="space-y-3 py-4 px-2">
            {recipeItem?.length === 0 && <IconNoData />}
            {recipeItem?.map((item, key) => (
              <li className="flex" key={key}>
                <Dot
                  size={30}
                  className={`${
                    item.recipe_is_active ? "text-success" : "text-gray"
                  }
                    `}
                />
                {item.recipe_title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardAccordion;
