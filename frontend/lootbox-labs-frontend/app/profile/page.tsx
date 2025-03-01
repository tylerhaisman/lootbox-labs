"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Nav from "@/components/nav/nav";
import Footer from "@/components/footer/footer";

interface PurchasedBox {
  id: number;
  name: string;
  image: string;
}

const fetchPurchasedBoxes = async (userId: string): Promise<PurchasedBox[]> => {
  const response = await fetch(`/api/purchases?userId=${userId}`);
  if (!response.ok) {
    return [];
  }
  return response.json();
};

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const [purchasedBoxes, setPurchasedBoxes] = useState<PurchasedBox[]>([]);

  useEffect(() => {
    if (isLoaded && user) {
      fetchPurchasedBoxes(user.id).then(setPurchasedBoxes);
    }
  }, [isLoaded, user]);

  if (!isLoaded) return <p>Loading...</p>;
  if (!user) return <p>Please log in to see your purchased boxes.</p>;

  return (
    <div className="relative">
      <div className="max-w-[1500px] m-auto p-6">
        <Nav />
        <div className="p-6">
          <h1 className="text-3xl font-bold">Your Purchased Boxes</h1>
          <p className="text-lg text-gray-600">Welcome, {user.fullName}!</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {purchasedBoxes.length > 0 ? (
              purchasedBoxes.map((box) => (
                <div key={box.id} className="border rounded-md p-4">
                  <Image src={box.image} alt={box.name} width={150} height={150} />
                  <h2 className="mt-2 text-xl font-semibold">{box.name}</h2>
                </div>
              ))
            ) : (
              <p>You haven't purchased any boxes yet.</p>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}