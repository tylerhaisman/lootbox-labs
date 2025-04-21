"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

// COMPONENTS
import Footer from "@/components/footer/footer";
import Nav from "@/components/nav/nav";

// ASSETS
const BoxClosed = "/assets/images/lootboxclosed.webp";
const BoxOpen = "/assets/images/lootboxopen.webp";
const LightEffect = "/assets/images/lighteffect.webp";
const WatchPrize = "/assets/images/22576-7-rolex-watch-transparent-image.png";

// Image mapping
const imageOptions = {
  pen: "/assets/images/pen.webp",
  batman: "/assets/images/batman-01-logo-png-transparent.png",
  florida: "/assets/images/Florida_Gators_gator_logo.svg.png",
  watch: "/assets/images/22576-7-rolex-watch-transparent-image.png",
  default: "/assets/images/lootboxclosed.webp",
};

// Function to find the most appropriate image for a box based on its name
function findBoxImage(boxName: string): string {
  const lowerName = boxName.toLowerCase();

  for (const [keyword, imagePath] of Object.entries(imageOptions)) {
    if (lowerName.includes(keyword.toLowerCase())) {
      return imagePath;
    }
  }

  return imageOptions.default;
}

interface BoxInterface {
  BoxName: string;
  Description: string;
  _id: string;
  BoxPrice: number;
  Categories: Array<string>;
  Probability: Array<Array<number>>;
}

interface BoxItem {
  id: number;
  name: string;
  value: number;
  chance: number;
  image: string;
}

export default function BoxPage() {
  const params = useParams();
  const boxId = params.box_id as string;
  const { user } = useUser();

  const [box, setBox] = useState<BoxInterface | null>(null);
  const [boxItems, setBoxItems] = useState<BoxItem[]>([]);
  const [isOpening, setIsOpening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showLight, setShowLight] = useState(false);
  const [showPrize, setShowPrize] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [wonItem, setWonItem] = useState<string | null>(null);

  useEffect(() => {
    const fetchBox = async () => {
      try {
        console.log("Fetching box with ID:", boxId);
        const response = await fetch("http://127.0.0.1:5001/boxes", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch boxes");
        }

        const boxes = await response.json();
        console.log("Received boxes:", boxes);

        const foundBox = boxes.find((b: any) => {
          const currentId =
            typeof b._id === "string" ? b._id : b._id.$oid || b._id;
          console.log("Comparing IDs:", currentId, boxId);
          return currentId === boxId;
        });

        if (foundBox) {
          console.log("Found box data:", foundBox);

          setBox(foundBox);
        } else {
          setError("Box not found");
        }
      } catch (err) {
        console.error("Error fetching box details:", err);
        setError("Failed to load box details");
      } finally {
        setLoading(false);
      }
    };

    if (boxId) {
      fetchBox();
    } else {
      setError("No box ID provided");
      setLoading(false);
    }
  }, [boxId]);

  // Fetch box items when box data is loaded
  useEffect(() => {
    const fetchBoxItems = async () => {
      if (!box || !box.BoxName) return;

      try {
        const response = await fetch(
          `http://127.0.0.1:5001/boxes/${encodeURIComponent(
            box.BoxName
          )}/items`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        );

        if (!response.ok) {
          console.error("Failed to fetch box items");
          return;
        }

        const items = await response.json();
        console.log("Box items:", items);
        setBoxItems(items);
      } catch (err) {
        console.error("Error fetching box items:", err);
      }
    };

    fetchBoxItems();
  }, [box]);

  const handleOpenBox = async () => {
    if (!user) {
      setError("Please log in to open this box");
      return;
    }

    if (!box) {
      setError("Box information not loaded");
      return;
    }

    setIsOpening(true);

    try {
      console.log("Opening box with name:", box.BoxName);

      const response = await fetch(
        `http://localhost:5001/lootbox/${encodeURIComponent(box.BoxName)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clerkId: user.id,
            boxName: box.BoxName,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to open lootbox: ${errorData.error || response.statusText}`
        );
      }

      const result = await response.json();
      console.log("Lootbox result:", result);
      setWonItem(result.reward);

      // Animation sequence
      setTimeout(() => {
        setIsOpening(false);
        setIsOpen(true);

        setTimeout(() => {
          setShowLight(true);
          setTimeout(() => {
            setShowPrize(true);
          }, 500);
        }, 500);
      }, 1000);
    } catch (err) {
      console.error("Error opening lootbox:", err);
      setError("Failed to open lootbox");
      setIsOpening(false);
    }
  };

  if (loading) {
    return (
      <div className="relative">
        <div className="max-w-[1500px] m-auto p-6">
          <Nav />
          <div className="flex flex-col items-center mt-12">
            <div className="animate-pulse">
              <div className="h-8 w-60 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-96 bg-gray-200 rounded mb-8"></div>
              <div className="h-64 w-64 bg-gray-200 rounded"></div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative">
        <div className="max-w-[1500px] m-auto p-6">
          <Nav />
          <div className="flex flex-col items-center mt-12">
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="max-w-[1500px] m-auto p-6">
        {/* NAVIGATION */}
        <Nav />

        {/* BOX DETAILS */}
        {box && (
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">{box.BoxName}</h1>
            {box.Description && <p className="mt-2">{box.Description}</p>}
            <p className="mt-2 font-bold">Price: ${box.BoxPrice}</p>

            {/* Categories badges */}
            {box.Categories && box.Categories.length > 0 && (
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {box.Categories.filter((category) => category !== "All").map(
                  (category) => (
                    <span
                      key={category}
                      className="bg-gray-100 border border-black rounded-md py-1 px-2 text-sm"
                    >
                      {category}
                    </span>
                  )
                )}
              </div>
            )}
          </div>
        )}

        {/* TWO COLUMN LAYOUT */}
        <div className="flex flex-col md:flex-row gap-8 mb-24">
          {/* LEFT COLUMN - LOOT BOX OPENING ANIMATION */}
          <div className="flex-1 flex flex-col items-center">
            {!isOpen && (
              <button
                onClick={handleOpenBox}
                className="px-6 py-3 bg-yellow-500 text-white font-bold rounded-md shadow-lg hover:bg-yellow-600 transition-colors disabled:bg-gray-400"
                disabled={isOpening || !box}
              >
                {isOpening ? "Opening..." : "Open Loot Box"}
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
                    ? {
                        x: [-5, 5, -5, 5, -5, 5, 0],
                        y: [0, -10, 0, -10, 0, -10, 0],
                      }
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
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.img
                    src={WatchPrize}
                    alt={wonItem || "Prize"}
                    className="absolute inset-0 m-auto transform -translate-y-1/2"
                    initial={{ opacity: 0, y: -50, scale: 0.1 }}
                    animate={{ opacity: 1, x: 3, y: 0, scale: 0.3 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                  {wonItem && (
                    <motion.div
                      className="absolute bottom-[-80px] text-center w-full"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <h3 className="text-xl font-bold mb-2">You won:</h3>
                      <p className="text-lg">{wonItem}</p>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN - WINNABLE ITEMS LIST */}
          <div className="flex-1 border border-black rounded-md p-4">
            <h2 className="text-xl font-bold mb-4">Winnable Items</h2>

            {boxItems.length === 0 ? (
              <div className="flex justify-center items-center h-40">
                <p className="text-gray-500">Loading winnable items...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {boxItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center p-3 border border-gray-200 rounded-md hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center mr-4">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <div className="text-3xl text-gray-300">?</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        Value: ${item.value}
                      </p>
                    </div>
                    <div className="ml-4 text-right">
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
                        {item.chance.toFixed(1)}% chance
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 p-3 bg-gray-50 rounded-md">
              <h3 className="font-semibold mb-2">Box Information</h3>
              <p className="text-sm">
                Each box contains items with different rarity levels. The
                percentage indicates your chance of winning that item when
                opening this box.
              </p>
            </div>
          </div>
        </div>

        {/* Add additional spacing for the footer */}
        <div className="pb-20"></div>

        {/* FOOTER */}
        <Footer />
      </div>
    </div>
  );
}
