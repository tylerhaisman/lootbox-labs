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

// Types for MongoDB document structure
interface MongoBox {
  _id: {
    $oid: string;
  };
  BoxName: string;
  BoxPrice: {
    $numberDouble: string;
  };
  Probability: Array<[{
    $numberInt: string;
  }, {
    $numberInt: string;
  }]>;
}

// Transformed box interface for frontend use
interface Box {
  _id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
}

export default function BoxPage() {
  // Get the box_id from the URL
  const params = useParams();
  const boxId = params.box_id as string;
  const { user } = useUser();
  
  // State variables
  const [box, setBox] = useState<Box | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showLight, setShowLight] = useState(false);
  const [showPrize, setShowPrize] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [wonItem, setWonItem] = useState<string | null>(null);

  // Function to transform MongoDB box data to frontend format
  const transformBoxData = (mongoBox: any): Box => {
    // Check if _id is a string or an object with $oid
    const boxId = typeof mongoBox._id === 'string' 
      ? mongoBox._id 
      : (mongoBox._id.$oid || mongoBox._id);
    
    return {
      _id: boxId,
      name: mongoBox.BoxName,
      price: mongoBox.BoxPrice && mongoBox.BoxPrice.$numberDouble 
        ? parseFloat(mongoBox.BoxPrice.$numberDouble)
        : 0,
      description: `A collection of exciting items with different chances to win!`,
      image: "/assets/images/lootboxclosed.webp"
    };
  };

  // Fetch box details when component mounts
  useEffect(() => {
    const fetchBox = async () => {
      try {
        console.log("Fetching box with ID:", boxId);
        const response = await fetch('http://localhost:5001/boxes');
        if (!response.ok) {
          throw new Error('Failed to fetch boxes');
        }
        
        const boxes = await response.json();
        console.log("Received boxes:", boxes);
        
        // Find the box with matching ID
        const foundBox = boxes.find((b: any) => {
          const currentId = typeof b._id === 'string' ? b._id : (b._id.$oid || b._id);
          console.log("Comparing:", currentId, boxId);
          return currentId === boxId;
        });
        
        if (foundBox) {
          console.log("Found box:", foundBox);
          setBox(transformBoxData(foundBox));
        } else {
          setError('Box not found');
        }
      } catch (err) {
        console.error('Error fetching box details:', err);
        setError('Failed to load box details');
      } finally {
        setLoading(false);
      }
    };

    if (boxId) {
      fetchBox();
    } else {
      setError('No box ID provided');
      setLoading(false);
    }
  }, [boxId]);

  const handleOpenBox = async () => {
    if (!user) {
      setError('Please log in to open this box');
      return;
    }
    
    if (!box) {
      setError('Box information not loaded');
      return;
    }
    
    setIsOpening(true); // Start shaking animation

    try {
      // Debug what we're sending
      console.log("Opening box with name:", box.name);
      
      // Call your lootbox endpoint with the box name
      const response = await fetch(`http://localhost:5001/lootbox/${encodeURIComponent(box.name)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId: user.id,
          boxName: box.name // Include box name in body as well
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to open lootbox: ${errorData.error || response.statusText}`);
      }
      
      const result = await response.json();
      console.log("Lootbox result:", result);
      setWonItem(result.reward);
      
      // Animation sequence
      setTimeout(() => {
        setIsOpening(false);
        setIsOpen(true); // Open the box

        setTimeout(() => {
          setShowLight(true); // Show the light inside the box
          setTimeout(() => {
            setShowPrize(true); // Show the prize after light appears
          }, 500);
        }, 500);
      }, 1000);
    } catch (err) {
      console.error('Error opening lootbox:', err);
      setError('Failed to open lootbox');
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
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
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
            <h1 className="text-3xl font-bold">{box.name}</h1>
            {box.description && <p className="mt-2">{box.description}</p>}
            {box.price && <p className="mt-2 font-bold">Price: ${box.price.toFixed(2)}</p>}
          </div>
        )}

        {/* LOOT BOX OPENING ANIMATION */}
        <div className="flex flex-col items-center mt-12">
          {!isOpen && (
            <button
              onClick={handleOpenBox}
              className="px-6 py-3 bg-yellow-500 text-white font-bold rounded-md shadow-lg hover:bg-yellow-600 transition-colors disabled:bg-gray-400"
              disabled={isOpening || !box}
            >
              {isOpening ? 'Opening...' : 'Open Loot Box'}
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
                    className="absolute bottom-0 text-center w-full"
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

        {/* FOOTER */}
        <Footer />
      </div>
    </div>
  );
}