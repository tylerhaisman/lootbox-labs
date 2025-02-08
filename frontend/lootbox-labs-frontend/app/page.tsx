"use client";

import Image from "next/image";
import { useState } from "react";

//ICONS
//import icons here

//IMAGES
//for stickers
import FerarriImage from "../public/assets/images/pngimg.com - ferrari_PNG10657.png";
import ComputerImage from "../public/assets/images/111902_mbp14-silver2.png";
import ControllerImage from "../public/assets/images/pngimg.com - xbox_PNG17527.png";
import RolexImage from "../public/assets/images/22576-7-rolex-watch-transparent-image.png";
import JordansImage from "../public/assets/images/Air-Jordan-PNG-Pic-Background.png";
import ShirtImage from "../public/assets/images/louis-vuitton-flocked-lv-t-shirt--FRTS59UOL904_PM2_Front view.webp";
import CologneImage from "../public/assets/images/zxf8ta6p0qmq-prada-lhomme.png";
//other images
import BoxImage from "../public/assets/images/box-cartone_preview_0c50.png";
import BoxLightImage from "../public/assets/images/box-light.png";
import BoxItemsImage from "../public/assets/images/box-items.png";

export default function Home() {
  const [navMenuOpen, setNavMenuOpen] = useState(false);

  return (
    <div className="max-w-[1500px] m-auto p-6">
      {/* NAV BAR */}
      <div className="w-full flex justify-between items-center pb-6">
        {/* LEFT SIDE */}
        <div className="logo">LootBox Labs</div>
        {/* RIGHT SIDE */}
        <div className="flex gap-4 items-center">
          {/* SIGN-IN BUTTON */}
          <button className="bg-gradient-to-r from-purple-200 via-yellow-200 to-pink-200 px-4 py-2 rounded-full hover:shadow-inner duration-75">
            Sign In
          </button>
          {/* NAV MENU */}
          <div
            className={
              navMenuOpen
                ? "flex flex-col duration-100"
                : "flex flex-col gap-1 duration-100"
            }
            onClick={() => setNavMenuOpen(!navMenuOpen)}
          >
            <div
              className={
                navMenuOpen
                  ? "w-4 h-[2px] bg-gray-700 rotate-45 translate-y-[1px] rounded-full duration-100"
                  : "w-4 h-[2px] bg-gray-700 rounded-full duration-100"
              }
            ></div>
            <div
              className={
                navMenuOpen
                  ? "w-4 h-[2px] bg-gray-700 -rotate-45 translate-y-[-1px] rounded-full duration-100"
                  : "w-4 h-[2px] bg-gray-700 rounded-full duration-100"
              }
            ></div>
          </div>
        </div>
      </div>
      {/* TITLE CONTENT */}
      <div className=" p-6 relative overflow-hidden h-[600px] sm:h-[800px] xl:h-[1000px] rounded-3xl flex flex-col items-center bg-[linear-gradient(to_bottom,theme(colors.gray.50)_20%,theme(colors.purple.200)_60%,theme(colors.yellow.200)_80%,theme(colors.pink.200)_100%)]">
        <div className="relative z-20 t text-center mt-16">
          Unbox the unexpected.
        </div>
        <Image
          src={BoxLightImage}
          alt="Box Light Image"
          className="absolute bottom-0"
        ></Image>
        <Image
          src={BoxItemsImage}
          alt="Box Items Image"
          className="absolute bottom-0 z-10"
        ></Image>
        {/* <Image
          src={BoxImage}
          alt="Box Image"
          className="absolute bottom-0 top-0 my-auto w-4/5 max-w-5xl translate-y-72"
        ></Image> */}
        {/* STICKERS */}
        {/* <div className="absolute top-6 bottom-6 left-12 right-12 flex gap-3 justify-between items-center">
          <div className="w-44 drop-shadow-md -translate-y-80">
            <div className="absolute inset-0 transform scale-x-[1.1] scale-y-[1.2] filter brightness-0 saturate-100 invert">
              <Image src={FerarriImage} alt="Ferarri Outline" className="" />
            </div>
            <Image
              src={FerarriImage}
              alt="Ferarri Image"
              className="relative"
            />
          </div>
          <div className="w-44 drop-shadow-md -translate-y-0">
            <div className="absolute inset-0 transform scale-x-[1.1] scale-y-[1.1] filter brightness-0 saturate-100 invert">
              <Image src={ComputerImage} alt="Ferarri Outline" className="" />
            </div>
            <Image
              src={ComputerImage}
              alt="Ferarri Image"
              className="relative"
            />
          </div>
          <div className="w-36 drop-shadow-md -translate-y-32">
            <div className="absolute inset-0 transform scale-x-[1.1] scale-y-[1.25] translate-y-[2px] filter brightness-0 saturate-100 invert">
              <Image src={ControllerImage} alt="Ferarri Outline" className="" />
            </div>
            <Image
              src={ControllerImage}
              alt="Ferarri Image"
              className="relative"
            />
          </div>
          <div className="w-24 drop-shadow-md -translate-y-80">
            <div className="absolute inset-0 transform scale-x-[1.2] scale-y-[1.1] filter brightness-0 saturate-100 invert">
              <Image src={RolexImage} alt="Ferarri Outline" className="" />
            </div>
            <Image src={RolexImage} alt="Ferarri Image" className="relative" />
          </div>
          <div className="w-44 drop-shadow-md translate-y-10">
            <div className="absolute inset-0 transform scale-x-[1.2] scale-y-[1.2] translate-x-1 -translate-y-[2px] filter brightness-0 saturate-100 invert">
              <Image src={JordansImage} alt="Ferarri Outline" className="" />
            </div>
            <Image
              src={JordansImage}
              alt="Ferarri Image"
              className="relative"
            />
          </div>
          <div className="w-52 drop-shadow-md -translate-y-44">
            <div className="absolute inset-0 transform scale-x-[1.3] scale-y-[1.1] filter brightness-0 saturate-100 invert">
              <Image src={ShirtImage} alt="Ferarri Outline" className="" />
            </div>
            <Image src={ShirtImage} alt="Ferarri Image" className="relative" />
          </div>
          <div className="w-20 drop-shadow-md translate-y-28">
            <div className="absolute inset-0 transform scale-x-[1.25] scale-y-[1.1] filter brightness-0 saturate-100 invert">
              <Image src={CologneImage} alt="Ferarri Outline" className="" />
            </div>
            <Image
              src={CologneImage}
              alt="Ferarri Image"
              className="relative"
            />
          </div>
        </div> */}
      </div>
    </div>
  );
}
