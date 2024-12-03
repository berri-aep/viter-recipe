import { imgPath } from '@/components/helpers/functions-general';
import { Search } from 'lucide-react';
import React from 'react'
import { NavLink } from 'react-router-dom';

const Headings = () => {
  return (
    <header className="bg-dark py-2">
      <div className="container">
        <div className=" flex justify-between items-center">
          <img
            src={`${imgPath}/recipe-logo2.png`}
            alt=""
            className="w-[60px]"
          />
          <nav>
            <ul className="flex items-center gap-5 text-white">
              <li>
                <NavLink>About</NavLink>
              </li>
              <li>
                <NavLink>Delivery</NavLink>
              </li>
              <li>
                <NavLink>Location</NavLink>
              </li>
              <li>
                <NavLink>Contact</NavLink>
              </li>
            </ul>
          </nav>
          <button>
            <Search stroke="white" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Headings