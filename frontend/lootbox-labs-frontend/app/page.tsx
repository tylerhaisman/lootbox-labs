"use client";

import Image from "next/image";
import { useState } from "react";

//ICONS
import GitHubIcon from "../public/assets/icons/github-142-svgrepo-com.svg";
import ArrowIcon from "../public/assets/icons/arrow-up-337-svgrepo-com.svg";

//IMAGES
import BoxLightImage from "../public/assets/images/box-light.png";
import BoxItemsImage from "../public/assets/images/box-items.png";
import BatmanImage from "../public/assets/images/batman-01-logo-png-transparent.png";
import RolexImage from "../public/assets/images/22576-7-rolex-watch-transparent-image.png";
import GatorsImage from "../public/assets/images/Florida_Gators_gator_logo.svg.png";

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
          <button className="flex justify-center items-center bg-gradient-to-r from-purple-200 via-yellow-200 to-pink-200 px-4 py-2 rounded-full hover:shadow-inner duration-75">
            Sign In
            <div className=" arrow flex items-center justify-center">
              <div className="arrowMiddle"></div>
              <div>
                <Image
                  src={ArrowIcon}
                  alt=""
                  width={14}
                  height={14}
                  className="arrowSide"
                ></Image>
              </div>
            </div>
          </button>
          {/* NAV MENU */}
          <div
            className={
              navMenuOpen
                ? "flex flex-col duration-100 relative"
                : "flex flex-col gap-1 duration-100 relative"
            }
            onClick={() => setNavMenuOpen(!navMenuOpen)}
          >
            <div
              className={
                navMenuOpen
                  ? "w-4 h-[2px] bg-black rotate-45 translate-y-[1px] rounded-full duration-100"
                  : "w-4 h-[2px] bg-black rounded-full duration-100"
              }
            ></div>
            <div
              className={
                navMenuOpen
                  ? "w-4 h-[2px] bg-black -rotate-45 translate-y-[-1px] rounded-full duration-100"
                  : "w-4 h-[2px] bg-black rounded-full duration-100"
              }
            ></div>
            {navMenuOpen && (
              <div className="z-50 absolute top-8 right-0 bg-gray-50/60 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-black flex w-max">
                <div className="flex flex-col gap-4">
                  <h2>Home</h2>
                  <p>All Boxes</p>
                  <p>About Us</p>
                  <p>Contact Us</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* TITLE CONTENT */}
      <div className="p-6 relative overflow-hidden h-[600px] sm:h-[800px] xl:h-[1000px] rounded-3xl flex flex-col items-center bg-[linear-gradient(to_bottom,theme(colors.gray.50)_20%,theme(colors.purple.200)_60%,theme(colors.yellow.200)_80%,theme(colors.pink.200)_100%)]">
        <div className="t relative z-20 text-center mt-16 bg-gradient-to-b from-black via-black to-transparent bg-clip-text text-transparent">
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
      </div>
      {/* PAGE CONTENT */}
      <div className="">
        <div className="t relative z-20 mt-16 bg-gradient-to-b from-black via-black to-transparent bg-clip-text text-transparent">
          Featured boxes
        </div>
        <div className="flex justify-between gap-4 mt-4">
          <div className="flex-1">
            <div className="overflow-hidden relative rounded-3xl min-h-44 bg-gradient-to-t from-gray-100 to-gray-50">
              <div className="blur-xl">
                <div className="absolute top-0 w-full h-60 translate-y-16 left-0 right-0 m-auto rounded-full bg-gradient-to-r from-purple-200 via-yellow-200 to-pink-200"></div>
              </div>
              <Image
                src={BoxLightImage}
                alt="Box Light Image"
                className="absolute bottom-0 left-0 right-0 w-3/5 m-auto"
              ></Image>
              {/* <Image
                src={RolexImage}
                alt="Rolex Image"
                className="absolute z-20 w-20 top-0 bottom-0 left-0 right-0 m-auto drop-shadow-xl"
              ></Image> */}
            </div>
            <div className="mt-4">
              <h1>Designer Watches</h1>
              <p>Unbox for your chance to win a Rolex or Swiss Army watch.</p>
              <button className="flex justify-center items-center mt-4 bg-gradient-to-r from-purple-200 via-yellow-200 to-pink-200 px-4 py-2 rounded-full hover:shadow-inner duration-75">
                Unbox
                <div className=" arrow flex items-center justify-center">
                  <div className="arrowMiddle"></div>
                  <div>
                    <Image
                      src={ArrowIcon}
                      alt=""
                      width={14}
                      height={14}
                      className="arrowSide"
                    ></Image>
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div className="flex-1">
            <div className="overflow-hidden relative rounded-3xl min-h-44 bg-gradient-to-t from-gray-100 to-gray-50">
              <div className="blur-xl">
                <div className="absolute top-0 w-full h-60 translate-y-16 left-0 right-0 m-auto rounded-full bg-gradient-to-r from-purple-200 via-yellow-200 to-pink-200"></div>
              </div>
              <Image
                src={BoxLightImage}
                alt="Box Light Image"
                className="absolute bottom-0 left-0 right-0 w-3/5 m-auto"
              ></Image>
              {/* <Image
                src={BatmanImage}
                alt="Batman Image"
                className="absolute z-20 w-32 top-0 bottom-0 left-0 right-0 m-auto drop-shadow-xl"
              ></Image> */}
            </div>
            <div className="mt-4">
              <h1>Batman</h1>
              <p>
                Unbox a Batman-themed box where you could win an action figure
                or a real Batmobile!
              </p>
              <button className="flex justify-center items-center mt-4 bg-gradient-to-r from-purple-200 via-yellow-200 to-pink-200 px-4 py-2 rounded-full hover:shadow-inner duration-75">
                Unbox
                <div className=" arrow flex items-center justify-center">
                  <div className="arrowMiddle"></div>
                  <div>
                    <Image
                      src={ArrowIcon}
                      alt=""
                      width={14}
                      height={14}
                      className="arrowSide"
                    ></Image>
                  </div>
                </div>
              </button>
            </div>
          </div>{" "}
          <div className="flex-1">
            <div className="overflow-hidden relative rounded-3xl min-h-44 bg-gradient-to-t from-gray-100 to-gray-50">
              <div className="blur-xl">
                <div className="absolute top-0 w-full h-60 translate-y-16 left-0 right-0 m-auto rounded-full bg-gradient-to-r from-purple-200 via-yellow-200 to-pink-200"></div>
              </div>
              <Image
                src={BoxLightImage}
                alt="Box Light Image"
                className="absolute bottom-0 left-0 right-0 w-3/5 m-auto"
              ></Image>
              {/* <Image
                src={GatorsImage}
                alt="Gators Image"
                className="absolute z-20 w-32 top-0 bottom-0 left-0 right-0 m-auto drop-shadow-xl"
              ></Image> */}
            </div>
            <div className="mt-4">
              <h1>Florida Gators</h1>
              <p>
                Unbox for your chance to win a t-shirt or signed Tim Tebow
                football!
              </p>
              <button className="flex justify-center items-center mt-4 bg-gradient-to-r from-purple-200 via-yellow-200 to-pink-200 px-4 py-2 rounded-full hover:shadow-inner duration-75">
                Unbox
                <div className=" arrow flex items-center justify-center">
                  <div className="arrowMiddle"></div>
                  <div>
                    <Image
                      src={ArrowIcon}
                      alt=""
                      width={14}
                      height={14}
                      className="arrowSide"
                    ></Image>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* FOOTER */}
      <div className="flex gap-4 mt-16 lg:flex-row flex-col">
        <div className="flex flex-col justify-between gap-4 lg:max-w-[380px]">
          <div className="logo">LootBox Labs</div>
          <div className="">
            <Image src={GitHubIcon} alt="GitHubIcon" className="w-5"></Image>
            <p className="mt-2">
              © 2025 Lootbox Labs @ University of Florida. All Rights Reserved.
            </p>
          </div>
        </div>
        <div className="w-[1px] bg-black/10 rounded-full mx-6"></div>
        <div className="flex-1 flex gap-4 justify-between lg:flex-row flex-col">
          <div className="flex flex-col gap-4">
            <h2>Features</h2>
            <p>All Boxes</p>
            <p>Featured Boxes</p>
          </div>
          <div className="flex flex-col gap-4">
            <h2>About</h2>
            <p>How Does It Work?</p>
            <p>Meet The Team</p>
            <p>Contact Us</p>
          </div>
          <div className="flex flex-col gap-4">
            <h2>Legal</h2>
            <p>Terms of Use</p>
            <p>Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
