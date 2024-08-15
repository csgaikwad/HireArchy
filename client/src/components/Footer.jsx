import React from "react";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitterSquare, FaYoutube } from "react-icons/fa";

import { AiFillInstagram, AiFillMail } from "react-icons/ai";

export const Footer = () => {
  return (
    <>
      <div className="bg-gray-900 text-white py-3 pt-5 flex items-center justify-center">
        <div>
          <div className="flex flex-col justify-center items-center pt-5 ">
            <p className="titleT text-2xl flex justify-center items-center">
              {" "}
              <MdOutlineBusinessCenter /> HireArchy
            </p>
            <p className="text-sm text-gray-300">
              Giving best opportunities to best peoples.
            </p>
          </div>

          <div className="flex gap-5 py-2 justify-center items-center">
            <FaFacebook
              className="cursor-pointer hover:text-[#2D68C4] duration-200 ease"
              size={22}
            />
            <FaTwitterSquare
              className="cursor-pointer hover:text-[#1DA1F2] duration-200 ease"
              size={22}
            />
            <FaYoutube
              className="cursor-pointer hover:text-[#FF0000] duration-200 ease"
              size={22}
            />
            <AiFillInstagram
              className="cursor-pointer hover:text-[#C13584] duration-200 ease"
              size={22}
            />
            <AiFillMail
              className="cursor-pointer hover:text-[#D44638] duration-200 ease"
              size={22}
            />
          </div>
        </div>
      </div>
    </>
  );
};
