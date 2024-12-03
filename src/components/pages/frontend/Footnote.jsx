import React from 'react'
import { imgPath } from "@/components/helpers/functions-general";
import { Facebook, Instagram, Search, Twitter, Youtube } from "lucide-react";
import { NavLink } from "react-router-dom";

const Footnote = () => {
  return (
    <>
      <footer className="py-24 bg-black text-white">
        <div className="container">
          <div className="grid md:grid-cols-[1fr_1fr_2fr_2fr] gap-5">
            <ul className="space-y-5">
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Cookie Policy</li>
            </ul>

            <ul className="space-y-5">
              <li>About</li>
              <li>Menu</li>
              <li>Delivery</li>
            </ul>
            <ul className="space-y-5">
              <li>Gallery</li>
              <li>Contact</li>
            </ul>
            <div>
              <ul className="flex gap-5 mb-5">
                <li>
                  <Instagram />
                </li>
                <li>
                  <Facebook />
                </li>
                <li>
                  <Twitter />
                </li>
                <li>
                  <Youtube />
                </li>
              </ul>
              <p className="mb-3">028 873 8934</p>
              <p>10 aldjfdj ahsdf, Laguna</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footnote