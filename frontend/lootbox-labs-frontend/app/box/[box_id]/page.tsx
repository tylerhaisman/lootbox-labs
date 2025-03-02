"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// COMPONENTS
import Footer from "@/components/footer/footer";
import Nav from "@/components/nav/nav";

// ASSETS
const BoxClosed = "/assets/images/lootboxclosed.webp";
const BoxOpen = "/assets/images/lootboxopen.webp";
const LightEffect = "/assets/images/lighteffect.webp";
const WatchPrize = "/assets/images/22576-7-rolex-watch-transparent-image.png";

export default function BoxPage() {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showLight, setShowLight] = useState(false);
  const [showPrize, setShowPrize] = useState(false);

  const handleOpenBox = () => {
    setIsOpening(true); // Start shaking animation

    setTimeout(() => {
      setIsOpening(false);
      setIsOpen(true); // Open the box

      setTimeout(() => {
        setShowLight(true); // Show the light inside the box
        setTimeout(() => {
          setShowPrize(true); // Show the prize after light appears
        }, 500);
      }, 500);
    }, 1000); // Shake duration before opening
  };

  return (
    <div className="relative">
      <div className="max-w-[1500px] m-auto p-6">
        {/* NAVIGATION */}
        <Nav />

        {/* LOOT BOX OPENING ANIMATION */}
        <div className="flex flex-col items-center mt-12">
          {!isOpen && (
            <button
              onClick={handleOpenBox}
              className="px-6 py-3 bg-yellow-500 text-white font-bold rounded-md shadow-lg"
            >
              Open Loot Box
            </button>
          )}

          {/* LOOT BOX CONTAINER */}
          <div className="relative mt-6">
            {/* LOOT BOX IMAGE */}
            <motion.img
              src={isOpen ? BoxOpen : BoxClosed}
              alt="Lootbox"
              className="relative"
              animate={
                isOpening
                  ? { x: [-5, 5, -5, 5, -5, 5, 0], y: [0, -10, 0, -10, 0, -10, 0] } // Shaking effect
                  : {}
              }
              transition={isOpening ? { duration: 0.6, repeat: 2 } : {}}
            />

            {/* LIGHT EFFECT */}
            {showLight && (
              <motion.img
                src={LightEffect}
                alt="Light Burst"
                className="absolute inset-0 m-auto transform -translate-y-1/2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.5 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            )}

            {/* REVEALED PRIZE */}
            {showPrize && (
              <motion.img
                src={WatchPrize}
                alt="Prize"
                className="absolute inset-0 m-auto transform -translate-y-1/2"
                initial={{ opacity: 0, y: -50, scale: 0.1 }} 
                animate={{ opacity: 1, x: 3, y: 0, scale: 0.3 }} 
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            )}
          </div>
        </div>

        {/* FOOTER */}
        <Footer />
      </div>
    </div>
  );
}