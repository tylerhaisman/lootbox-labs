"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";

//COMPONENTS
import Footer from "@/components/footer/footer";
import Nav from "@/components/nav/nav";

//ICONS
import SearchIcon from "../../public/assets/icons/search-alt-2-svgrepo-com.svg";
import { useState } from "react";

export default function AllBoxes() {
  const { isSignedIn } = useUser();
  const [selectedFilter, setSelectedFilter] = useState("Hot");
  const [filters, setFilters] = useState([
    "Hot",
    "Featured",
    "Tech",
    "Gaming",
    "Fashion",
  ]);
  return (
    <div className="relative">
      <div className="max-w-[1500px] m-auto p-6">
        {/* NAV BAR */}
        <Nav></Nav>
        {/* TITLE CONTENT */}
        <div className="p-6 relative overflow-hidden h-[600px] sm:h-[800px] xl:h-[1000px] rounded-md flex flex-col items-center bg-[linear-gradient(to_bottom,theme(colors.gray.50)_20%,theme(colors.purple.200)_60%,theme(colors.yellow.200)_80%,theme(colors.pink.200)_100%)]">
          advertisement slideshow for featured boxes
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
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
                <option value="Price (High to Low)">Price (High to Low)</option>
                <option value="Price (Low to High)">Price (Low to High)</option>
              </select>
            </div>
          </div>
        </div>
        {/* FOOTER */}
        <Footer></Footer>
      </div>
    </div>
  );
}
