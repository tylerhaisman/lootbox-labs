"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

//COMPONENTS
import Footer from "@/components/footer/footer";
import Nav from "@/components/nav/nav";

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

export default function AllBoxes() {
  const { isSignedIn } = useUser();
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchBoxes = async () => {
      try {
        const response = await fetch("http://localhost:5001/boxes");
        if (!response.ok) {
          throw new Error("Failed to fetch boxes");
        }
        
        const mongoBoxes = await response.json();
        // Transform the MongoDB data to our frontend format
        const transformedBoxes = mongoBoxes.map((box: MongoBox) => transformBoxData(box));
        setBoxes(transformedBoxes);
      } catch (err) {
        console.error("Error fetching boxes:", err);
        setError("Failed to load boxes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBoxes();
  }, []);

  return (
    <div className="relative">
      <div className="max-w-[1500px] m-auto p-6">
        {/* NAV BAR */}
        <Nav />
        
        {/* TITLE CONTENT */}
        <div className="p-6 relative overflow-hidden h-[300px] rounded-md flex flex-col items-center justify-center bg-[linear-gradient(to_bottom,theme(colors.gray.50)_20%,theme(colors.purple.200)_60%,theme(colors.yellow.200)_80%,theme(colors.pink.200)_100%)]">
          <h1 className="text-4xl font-bold mb-2">All Lootboxes</h1>
          <p className="text-lg text-center max-w-md">Explore our collection of exciting lootboxes and discover amazing rewards!</p>
        </div>
        
        {/* PAGE CONTENT */}
        <div className="my-12">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse bg-gray-100 rounded-lg p-6 h-72 flex flex-col items-center justify-center">
                  <div className="bg-gray-300 h-32 w-32 rounded-md mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p>{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {boxes.map((box) => (
                <Link
                  href={`/box/${box._id}`}
                  key={box._id}
                  className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <img
                      src={box.image || "/assets/images/lootboxclosed.webp"}
                      alt={box.name}
                      className="h-40 object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">{box.name}</h2>
                    {box.description && <p className="text-gray-600 mb-2 line-clamp-2">{box.description}</p>}
                    {box.price && <p className="font-bold text-yellow-600">${box.price.toFixed(2)}</p>}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        
        {/* FOOTER */}
        <Footer />
      </div>
    </div>
  );
}
