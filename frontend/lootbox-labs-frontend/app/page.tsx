"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";

//COMPONENTS
import Footer from "@/components/footer/footer";
import Nav from "@/components/nav/nav";

//ICONS
import ArrowIcon from "../public/assets/icons/arrow-up-337-svgrepo-com.svg";

//IMAGES
import BoxLightImage from "../public/assets/images/box-light.png";
import BoxItemsImage from "../public/assets/images/box-items.png";
import PenBox from "../public/assets/images/pen.webp";

const imageMap: Record<string, StaticImageData> = {
  PenBox,
};

interface BoxInterface {
  BoxName: string;
  Description: string;
  _id: string;
  BoxPrice: number;
  Categories: Array<string>;
  Probability: Array<Array<number>>;
}

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

    getBoxes();
  }, []);

  const [boxes, setBoxes] = useState<Array<BoxInterface>>([]);

  const getBoxes = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5001/boxes", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setBoxes(data);
      // ----
      // SAMPLE DATA FOR TESTING
      // Uncomment the following lines to use sample data instead of fetching from the API
      // ----
      // const sampleData: BoxInterface[] = [
      //   {
      //     _id: "67f87d4cf3c53416db8b35ff",
      //     BoxName: "PenBox",
      //     BoxPrice: 15.99,
      //     Probability: [
      //       [5000, 4],
      //       [2000, 5],
      //       [2000, 6],
      //     ],
      //     Categories: ["Hot", "Fashion", "Featured"],
      //     Description: "Unbox for your chance to win a limited edition pen.",
      //   },
      // ];
      // setBoxes(sampleData);
    } catch (error) {
      console.error(error);
    }
  };

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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
            {boxes.length > 0 &&
              [...boxes]
                .sort(() => 0.5 - Math.random()) // Randomize order
                .slice(0, 3)
                .map((box: BoxInterface) => (
                  <div
                    key={box._id}
                    className="border border-black rounded-md shadow-md"
                  >
                    <div className="relative rounded-b-3xl rounded-t-md bg-gradient-to-t from-gray-100 to-gray-50 h-44 overflow-hidden">
                      <div className="blur-xl">
                        <div className="absolute top-0 w-full h-60 translate-y-16 left-0 right-0 m-auto rounded-md bg-gradient-to-r from-purple-200 via-yellow-200 to-pink-200"></div>
                      </div>
                      <Image
                        src={BoxLightImage}
                        alt="Box Light Image"
                        className="absolute bottom-0 left-0 right-0 w-3/5 m-auto"
                      />
                      <Image
                        src={imageMap[box.BoxName] || ""}
                        alt={box.BoxName + " Image"}
                        className="absolute z-20 w-20 top-0 bottom-0 left-0 right-0 m-auto drop-shadow-xl"
                      ></Image>
                    </div>
                    <div
                      className="flex flex-col justify-between"
                      style={{ height: "calc(100% - 11rem)" }}
                    >
                      <div className="-mt-6 pt-10 pb-4 px-4">
                        <h1>{box.BoxName}</h1>
                        <div className="my-2 flex gap-2 flex-wrap">
                          {box.Categories.map((category: string) => (
                            <div
                              key={category}
                              className="bg-gray-100 border border-black rounded-md max-w-fit py-1 px-2 text-sm"
                            >
                              {category}
                            </div>
                          ))}
                        </div>
                        <p>{box.Description}</p>
                      </div>
                      <div className="flex justify-between items-center pb-4 px-4">
                        <Link
                          href={"/box/" + box._id}
                          className="cursor-pointer no-underline"
                        >
                          <button className="flex justify-center items-center bg-gradient-to-r from-purple-200 via-yellow-200 to-pink-200 px-4 py-2 rounded-md hover:shadow-inner duration-75">
                            See More
                            <div className="arrow flex items-center justify-center">
                              <div className="arrowMiddle"></div>
                              <div>
                                <Image
                                  src={ArrowIcon}
                                  alt=""
                                  width={14}
                                  height={14}
                                  className="arrowSide"
                                />
                              </div>
                            </div>
                          </button>
                        </Link>
                        <div className="">${box.BoxPrice}</div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
          <div className="shadow-lg border border-black rounded-md p-12 mt-16 flex justify-center items-center flex-col gap-12">
            <div className="w-full px-6 rounded-md t relative z-20 bg-gradient-to-r from-purple-200 via-yellow-200 to-pink-200">
              <div className="t relative z-20 bg-gradient-to-b from-black via-black to-transparent bg-clip-text text-transparent">
                About us
              </div>
            </div>
            <div className="flex justify-between gap-6 items-center">
              <div className="">
                <p className="">
                  At LootBox Labs, we're four college students on a mission to
                  make online shopping more exciting, unpredictable, and just a
                  little bit addictive—in the best way. Born out of a shared
                  passion for sleek software and high-stakes surprises, our team
                  set out to reimagine the e-commerce experience through the
                  lens of gamification.
                  <br></br> <br></br>
                  We built LootBox Labs as part of a semester-long course
                  project, but from day one, we approached it like a real
                  startup. Tyler and Isaac handled the front-end magic using
                  React and Next.js, crafting a polished, interactive user
                  experience. Neal and Connor engineered the backend with Flask
                  and MongoDB, building a secure and scalable system to power
                  the mystery behind every box.
                  <br></br> <br></br>
                  At the heart of LootBox Labs is a fair randomization
                  algorithm—because when it comes to mystery, nothing beats a
                  truly even shot. Whether you're aiming for a rare collectible
                  or just seeing what luck brings your way, our platform
                  delivers the thrill of chance with every purchase. It's kind
                  of like pulling a slot machine lever... except you always walk
                  away with something in your cart.
                  <br></br> <br></br>
                  We believe online shopping shouldn't just be about
                  transactions—it should be about anticipation, surprise, and a
                  little dose of dopamine. So go ahead—spin the wheel, open the
                  box, and see what's inside.
                </p>
              </div>
              <div className=""></div>
            </div>
          </div>
        </div>
        {/* FOOTER */}
        <Footer></Footer>
      </div>
    </div>
  );
}
