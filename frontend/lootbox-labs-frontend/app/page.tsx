"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

//COMPONENTS
import Footer from "@/components/footer/footer";
import Nav from "@/components/nav/nav";

//ICONS
import ArrowIcon from "../public/assets/icons/arrow-up-337-svgrepo-com.svg";

//IMAGES
import BoxLightImage from "../public/assets/images/box-light.png";
import BoxItemsImage from "../public/assets/images/box-items.png";

export default function Home() {
  const [data, setData] = useState<{ message: string } | null>(null);

  useEffect(() => {
    fetch("http://localhost:5001/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="relative">
      <div className="max-w-[1500px] m-auto p-6">
        {/* NAV BAR */}
        <Nav></Nav>
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
                <Link href="/box/box_id" className="cursor-pointer no-underline">
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
                </Link>
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
        </div>
        {/* FOOTER */}
        <Footer></Footer>
      </div>
    </div>
  );
}
