"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

//ICONS
import GitHubIcon from "../public/assets/icons/github-142-svgrepo-com.svg";
import ArrowIcon from "../public/assets/icons/arrow-up-337-svgrepo-com.svg";
import XIcon from "../public/assets/icons/close-svgrepo-com.svg";

//IMAGES
import BoxLightImage from "../public/assets/images/box-light.png";
import BoxItemsImage from "../public/assets/images/box-items.png";
import BatmanImage from "../public/assets/images/batman-01-logo-png-transparent.png";
import RolexImage from "../public/assets/images/22576-7-rolex-watch-transparent-image.png";
import GatorsImage from "../public/assets/images/Florida_Gators_gator_logo.svg.png";

export default function Home() {
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [viewSignIn, setViewSignIn] = useState(false);
  const [viewAuth, setViewAuth] = useState(false);
  const [viewRegister, setViewRegister] = useState(false);

  return (
    <div className="relative">
      <div className="max-w-[1500px] m-auto p-6">
        {/* NAV BAR */}
        <div className="w-full flex justify-between items-center pb-6">
          {/* LEFT SIDE */}
          <div className="logo">LootBox Labs</div>
          {/* RIGHT SIDE */}
          <div className="flex gap-4 items-center">
            {/* SIGN-IN BUTTON */}
            <button
              className="flex justify-center items-center bg-gradient-to-r from-purple-200 via-yellow-200 to-pink-200 px-4 py-2 rounded-md hover:shadow-inner duration-75"
              onClick={() => setViewAuth(!viewAuth)}
            >
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
                    ? "w-4 h-[2px] bg-black rotate-45 translate-y-[1px] rounded-md duration-100"
                    : "w-4 h-[2px] bg-black rounded-md duration-100"
                }
              ></div>
              <div
                className={
                  navMenuOpen
                    ? "w-4 h-[2px] bg-black -rotate-45 translate-y-[-1px] rounded-md duration-100"
                    : "w-4 h-[2px] bg-black rounded-md duration-100"
                }
              ></div>
              {navMenuOpen && (
                <div className="z-50 absolute top-8 right-0 bg-gray-50/60 backdrop-blur-md p-6 rounded-md shadow-lg border border-black flex w-max">
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
        <div className="p-6 relative overflow-hidden h-[600px] sm:h-[800px] xl:h-[1000px] rounded-md flex flex-col items-center bg-[linear-gradient(to_bottom,theme(colors.gray.50)_20%,theme(colors.purple.200)_60%,theme(colors.yellow.200)_80%,theme(colors.pink.200)_100%)]">
          <div className="mt-16 px-4 py-1 bg-black rounded-md">
            <p className="text-xs lg:text-sm tracking-widest bg-gradient-to-r from-purple-200 via-yellow-200 to-pink-200 bg-clip-text text-transparent">
              INTRODUCING LOOTBOX LABS
            </p>
          </div>
          <div className="mt-4 t relative z-20 text-center bg-gradient-to-b from-black via-black to-transparent bg-clip-text text-transparent">
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
          <div className="flex flex-col lg:flex-row justify-between gap-4 mt-4">
            <div className="flex-1">
              <div className="overflow-hidden relative rounded-md min-h-44 bg-gradient-to-t from-gray-100 to-gray-50">
                <div className="blur-xl">
                  <div className="absolute top-0 w-full h-60 translate-y-16 left-0 right-0 m-auto rounded-md bg-gradient-to-r from-purple-200 via-yellow-200 to-pink-200"></div>
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
                <button className="flex justify-center items-center mt-4 bg-gradient-to-r from-purple-200 via-yellow-200 to-pink-200 px-4 py-2 rounded-md hover:shadow-inner duration-75">
                  See More
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
              <div className="overflow-hidden relative rounded-md min-h-44 bg-gradient-to-t from-gray-100 to-gray-50">
                <div className="blur-xl">
                  <div className="absolute top-0 w-full h-60 translate-y-16 left-0 right-0 m-auto rounded-md bg-gradient-to-r from-purple-200 via-yellow-200 to-pink-200"></div>
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
                <button className="flex justify-center items-center mt-4 bg-gradient-to-r from-purple-200 via-yellow-200 to-pink-200 px-4 py-2 rounded-md hover:shadow-inner duration-75">
                  See More
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
              <div className="overflow-hidden relative rounded-md min-h-44 bg-gradient-to-t from-gray-100 to-gray-50">
                <div className="blur-xl">
                  <div className="absolute top-0 w-full h-60 translate-y-16 left-0 right-0 m-auto rounded-md bg-gradient-to-r from-purple-200 via-yellow-200 to-pink-200"></div>
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
                <button className="flex justify-center items-center mt-4 bg-gradient-to-r from-purple-200 via-yellow-200 to-pink-200 px-4 py-2 rounded-md hover:shadow-inner duration-75">
                  See More
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
          <div className="border-t border-black mt-16"></div>
        </div>
        {/* <div className="relative p-6 mt-16 rounded-md bg-gradient-to-r from-purple-200 via-yellow-200 to-pink-200">
          <div
            className="absolute inset-0 bg-[radial-gradient(black_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none rounded-md"
            style={{
              maskImage:
                "linear-gradient(to bottom right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)",
            }}
          ></div>
          <div className="relative">hello world</div>
        </div> */}

        {/* FOOTER */}
        <div className="flex gap-4 mt-16 lg:flex-row flex-col">
          <div className="flex flex-col justify-between gap-4 lg:max-w-[380px]">
            <div className="logo">LootBox Labs</div>
            <div className="">
              <Image src={GitHubIcon} alt="GitHubIcon" className="w-5"></Image>
              <p className="mt-2">
                © 2025 Lootbox Labs @ University of Florida. All Rights
                Reserved.
              </p>
            </div>
          </div>
          <div className="w-[1px] bg-black/10 rounded-md mx-6"></div>
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
      {/* AUTH POP-UP */}
      {viewAuth && (
        <div className="fixed left-0 right-0 top-0 bottom-0 backdrop-blur-md z-50 duration-100 flex flex-col gap-2 justify-center items-center p-6">
          <button
            className="p-2 rounded-md border border-black bg-white"
            onClick={() => {
              setViewAuth(false);
              setViewRegister(false);
              setViewSignIn(false);
            }}
          >
            <Image src={XIcon} alt="XIcon" className="w-6"></Image>
          </button>
          <form
            onSubmit={(e) => {
              //login
            }}
            className="shadow-lg max-w-xl h-fit z-50 p-6 rounded-md w-full flex flex-col gap-2 bg-white border-black border"
          >
            <h1>Welcome to LootBox Labs!</h1>
            <p className="mb-6">Sign in to start unboxing.</p>
            <div className="p-4 rounded-md border border-black">
              <p className="text-xs">EMAIL</p>
              <input
                type="email"
                placeholder="mail@example.com"
                className="placeholder:text-black/30 bg-transparent outline-none mt-1 w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              className="flex justify-center items-center bg-gradient-to-r from-purple-200 via-yellow-200 to-pink-200 px-4 py-2 rounded-md hover:shadow-inner duration-75"
              onClick={(e) => {
                e.preventDefault();
                setViewSignIn(true);
                setViewAuth(false);
              }}
            >
              {!isLoading && (
                <>
                  Continue with email{" "}
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
                </>
              )}
              {isLoading && (
                <div className="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              )}
            </button>
          </form>
        </div>
      )}
      {/* SIGN IN POP-UP */}
      {viewSignIn && (
        <div className="fixed left-0 right-0 top-0 bottom-0 backdrop-blur-md z-50 duration-100 flex flex-col gap-2 justify-center items-center p-6">
          <button
            className="p-2 rounded-md border border-black bg-white"
            onClick={() => {
              setViewAuth(false);
              setViewRegister(false);
              setViewSignIn(false);
            }}
          >
            <Image src={XIcon} alt="XIcon" className="w-6"></Image>
          </button>
          <form
            onSubmit={(e) => {
              //login
            }}
            className="shadow-lg max-w-xl h-fit z-50 p-6 rounded-md w-full flex flex-col gap-2 bg-white border-black border"
          >
            <h1>Welcome Back!</h1>
            <p className="mb-6">Sign in to keep unboxing.</p>
            <div className="p-4 rounded-md border border-black">
              <p className="text-xs">EMAIL</p>
              <input
                type="email"
                placeholder="mail@example.com"
                className="placeholder:text-black/30 bg-transparent outline-none mt-1 w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="p-4 rounded-md border border-black">
              <p className="text-xs">PASSWORD</p>
              <input
                type="password"
                placeholder="Minimum 8 Characters"
                className="placeholder:text-black/30 bg-transparent outline-none mt-1 w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="flex justify-center items-center mt-4 bg-gradient-to-r from-purple-200 via-yellow-200 to-pink-200 px-4 py-2 rounded-md hover:shadow-inner duration-75">
              {!isLoading && (
                <>
                  Sign In{" "}
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
                </>
              )}
              {isLoading && (
                <div className="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              )}
            </button>
            <p className="">
              Don't have an account?{" "}
              <Link
                href=""
                onClick={() => {
                  setViewSignIn(false);
                  setViewRegister(true);
                }}
              >
                Register.
              </Link>
            </p>
          </form>
        </div>
      )}
      {/* REGISTER POP-UP */}
      {viewRegister && (
        <div className="fixed left-0 right-0 top-0 bottom-0 backdrop-blur-md z-50 duration-100 flex flex-col gap-2 justify-center items-center p-6">
          <button
            className="p-2 rounded-md border border-black bg-white"
            onClick={() => {
              setViewAuth(false);
              setViewRegister(false);
              setViewSignIn(false);
            }}
          >
            <Image src={XIcon} alt="XIcon" className="w-6"></Image>
          </button>
          <form
            onSubmit={(e) => {
              //login
            }}
            className="shadow-lg max-w-xl h-fit z-50 p-6 rounded-md w-full flex flex-col gap-2 bg-white border-black border"
          >
            <h1>First Time?</h1>
            <p className="mb-6">Register to start unboxing.</p>
            <div className="p-4 rounded-md border border-black">
              <p className="text-xs">NAME</p>
              <input
                type="text"
                placeholder="Jane Doe"
                className="placeholder:text-black/30 bg-transparent outline-none mt-1 w-full"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="p-4 rounded-md border border-black">
              <p className="text-xs">EMAIL</p>
              <input
                type="email"
                placeholder="mail@example.com"
                className="placeholder:text-black/30 bg-transparent outline-none mt-1 w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="p-4 rounded-md border border-black">
              <p className="text-xs">PASSWORD</p>
              <input
                type="password"
                placeholder="Minimum 8 Characters"
                className="placeholder:text-black/30 bg-transparent outline-none mt-1 w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="flex justify-center items-center mt-4 bg-gradient-to-r from-purple-200 via-yellow-200 to-pink-200 px-4 py-2 rounded-md hover:shadow-inner duration-75">
              {!isLoading && (
                <>
                  Register{" "}
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
                </>
              )}
              {isLoading && (
                <div className="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              )}
            </button>
            <p className="">
              Have an account?{" "}
              <Link
                href=""
                onClick={() => {
                  setViewRegister(false);
                  setViewSignIn(true);
                }}
              >
                Sign in.
              </Link>
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
