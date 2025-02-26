"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SignInButton, UserButton, useUser, SignUpButton } from "@clerk/nextjs";

//COMPONENTS
import Footer from "@/components/footer/footer";

//ICONS
import GitHubIcon from "../../public/assets/icons/github-142-svgrepo-com.svg";
import ArrowIcon from "../../public/assets/icons/arrow-up-337-svgrepo-com.svg";
import XIcon from "../../public/assets/icons/close-svgrepo-com.svg";

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
  const { isSignedIn } = useUser();
  return (
    <div className="relative">
      <div className="max-w-[1500px] m-auto p-6">
        {/* NAV BAR */}
        <div className="w-full flex justify-between items-center pb-6">
          {/* LEFT SIDE */}
          <div className="logo">LootBox Labs</div>
          {/* RIGHT SIDE */}
          <div className="flex gap-4 items-center">
            {/* 🔹 Clerk Authentication Buttons (Sign In/Sign Up) */}
            <nav className="flex gap-4 items-center">
              {isSignedIn ? (
                // If user is signed in, show the account button
                <UserButton />
              ) : (
                // If user is not signed in, show Sign In and Sign Up buttons
                <>
                  <SignInButton mode="modal">
                    <button className="px-4 py-2 border border-black rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-75">
                      Sign In
                    </button>
                  </SignInButton>

                  <SignUpButton mode="modal">
                    <button className="bg-gradient-to-r from-purple-200 via-yellow-200 to-pink-200 px-4 py-2 rounded-md hover:shadow-inner">
                      Sign Up
                    </button>
                  </SignUpButton>
                </>
              )}
            </nav>

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
        <div className="p-6 relative overflow-hidden h-[600px] sm:h-[800px] xl:h-[1000px] rounded-md flex flex-col items-center bg-[linear-gradient(to_bottom,theme(colors.gray.50)_20%,theme(colors.purple.200)_60%,theme(colors.yellow.200)_80%,theme(colors.pink.200)_100%)]"></div>
        {/* PAGE CONTENT */}
        <div className="">all boxes</div>

        {/* FOOTER */}
        <Footer></Footer>
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
