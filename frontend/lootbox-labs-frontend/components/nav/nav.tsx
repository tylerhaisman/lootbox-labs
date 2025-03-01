"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SignInButton, UserButton, useUser, SignUpButton } from "@clerk/nextjs";

export default function Nav() {
  const [navMenuOpen, setNavMenuOpen] = useState(false);

  //AUTH
  const [viewSignIn, setViewSignIn] = useState(false);
  const [viewAuth, setViewAuth] = useState(false);
  const [viewRegister, setViewRegister] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <>
     
      <div className="w-full flex justify-between items-center pb-6">
        {/* LEFT SIDE */}
        <Link href="/" className="logo cursor-pointer no-underline hover:underline">
            LootBox Labs
        </Link>
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
                  <Link href="/" className="cursor-pointer no-underline hover:underline font-bold">
                    <h2>Home</h2>
                  </Link>
                  <Link href="/profile" className="cursor-pointer no-underline hover:underline">
                  Purchases
                  </Link>
                  <p>All Boxes</p>
                  <p>About Us</p>
                  <p>Contact Us</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
