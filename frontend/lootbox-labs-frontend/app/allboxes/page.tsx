"use client";

import { useUser } from "@clerk/nextjs";

//COMPONENTS
import Footer from "@/components/footer/footer";
import Nav from "@/components/nav/nav";

export default function AllBoxes() {
  const { isSignedIn } = useUser();
  return (
    <div className="relative">
      <div className="max-w-[1500px] m-auto p-6">
        {/* NAV BAR */}
        <Nav></Nav>
        {/* TITLE CONTENT */}
        <div className="p-6 relative overflow-hidden h-[600px] sm:h-[800px] xl:h-[1000px] rounded-md flex flex-col items-center bg-[linear-gradient(to_bottom,theme(colors.gray.50)_20%,theme(colors.purple.200)_60%,theme(colors.yellow.200)_80%,theme(colors.pink.200)_100%)]"></div>
        {/* PAGE CONTENT */}
        <div className="">all boxes</div>
        {/* FOOTER */}
        <Footer></Footer>
      </div>
    </div>
  );
}
