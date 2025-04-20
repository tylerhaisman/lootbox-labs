"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";

//COMPONENTS
import Footer from "@/components/footer/footer";
import Nav from "@/components/nav/nav";

//ICONS
import SearchIcon from "../../public/assets/icons/search-alt-2-svgrepo-com.svg";
import ArrowIcon from "../../public/assets/icons/arrow-up-337-svgrepo-com.svg";

//IMAGES
import BoxLightImage from "../../public/assets/images/box-light.png";
import PenBox from "../../public/assets/images/pen.webp";
import AllBoxesCover from "../../public/assets/images/allboxescover.png";

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

export default function AllBoxes() {
  const { isSignedIn } = useUser();

  const [selectedFilter, setSelectedFilter] = useState("All");
  const [filters, setFilters] = useState([
    "All",
    "Featured",
    "Tech",
    "Gaming",
    "Fashion",
  ]);
  const [boxes, setBoxes] = useState<Array<BoxInterface>>([]);

  const [searchTerm, setSearchTerm] = useState("");

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
      //     Categories: ["All", "Fashion", "Featured"],
      //     Description: "Unbox for your chance to win a limited edition pen.",
      //   },
      // ];
      // setBoxes(sampleData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBoxes();
  }, []);

  const filteredBoxes = boxes.filter(
    (box) =>
      box.Categories.includes(selectedFilter) &&
      box.BoxName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <div className="max-w-[1500px] m-auto p-6">
        {/* NAV BAR */}
        <Nav></Nav>
        {/* TITLE CONTENT */}
        <div className="relative overflow-hidden rounded-md flex flex-col items-center bg-[linear-gradient(to_bottom,theme(colors.gray.50)_20%,theme(colors.purple.200)_60%,theme(colors.yellow.200)_80%,theme(colors.pink.200)_100%)]">
          <Image src={AllBoxesCover} alt="" className="w-full"></Image>
        </div>
        {/* PAGE CONTENT */}
        <div className="">
          <div className="t relative z-20 mt-16 bg-gradient-to-b from-black via-black to-transparent bg-clip-text text-transparent">
            All boxes
          </div>
          {/* SEARCH */}
          <div className="flex justify-center items-center gap-4 w-full border border-black rounded-md overflow-hidden px-4">
            <input
              type="text"
              placeholder="Search boxes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 py-2 outline-none placeholder:text-black"
            />

            <div className="">
              <Image src={SearchIcon} alt="Search icon" className="w-5"></Image>
            </div>
          </div>
          <div className="flex justify-between items-center flex-wrap gap-4">
            {/* FILTERS */}
            <div className="flex flex-wrap gap-4 items-center mt-4">
              {filters.map((filter) => (
                <div
                  className="border border-black px-4 py-2 rounded-md cursor-pointer"
                  key={filter}
                  style={{
                    background:
                      selectedFilter == filter ? "black" : "transparent",
                    color: selectedFilter == filter ? "white" : "black",
                  }}
                  onClick={() => setSelectedFilter(filter)}
                >
                  {filter}
                </div>
              ))}
            </div>

            {/* SORTING */}
            <div className="flex flex-wrap gap-4 items-center mt-4">
              <p>Order by</p>
              <select
                name="orderBy"
                id="orderBy"
                className="border border-black rounded-md px-4 py-2 outline-none"
              >
                <option value="Recommended">Recommended</option>
                {/* <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
                <option value="Price (High to Low)">Price (High to Low)</option>
                <option value="Price (Low to High)">Price (Low to High)</option>
                <option value="Price (High to Low)">
                  Rarity (High to Low)
                </option>
                <option value="Price (Low to High)">
                  Rarity (Low to High)
                </option> */}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
            {filteredBoxes.length > 0 ? (
              filteredBoxes.map((box: BoxInterface) => (
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
                    />
                  </div>
                  <div
                    className="flex flex-col justify-between"
                    style={{ height: "calc(100% - 11rem)" }}
                  >
                    <div className="-mt-6 pt-10 pb-4 px-4">
                      <h1>{box.BoxName}</h1>
                      <div className="my-2 flex gap-2 flex-wrap">
                        {box.Categories.filter(
                          (category) => category !== "All"
                        ).map((category: string) => (
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
                      <div>${box.BoxPrice}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center">
                No boxes found in the selected category.
              </div>
            )}
          </div>
        </div>
        {/* FOOTER */}
        <Footer></Footer>
      </div>
    </div>
  );
}
