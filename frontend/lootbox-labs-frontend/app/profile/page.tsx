"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Nav from "@/components/nav/nav";
import Footer from "@/components/footer/footer";
import Link from "next/link";
import ArrowIcon from "../../public/assets/icons/arrow-up-337-svgrepo-com.svg";

interface BoxInterface {
  BoxName: string;
  Description: string;
  _id: string;
  BoxPrice: number;
  Categories: Array<string>;
  Probability: Array<Array<number>>;
}
interface BoxItem {
  _id: string;
  ItemId: number;
  ItemName: string;
  ItemValue: number;
}
interface PurchaseInterface {
  box: BoxInterface;
  item: BoxItem;
  timestamp: string;
}

export default function ProfilePage() {
  const { user, isLoaded } = useUser();

  const [purchases, setPurchases] = useState<PurchaseInterface[]>([]);

  const fetchUserData = async (id: string) => {
    const response = await fetch("http://localhost:5001/users/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clerkId: id,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to get user data");
        }
        const data = await response.json();
        console.log("User data fetched successfully:", data.purchases);
        setPurchases(data.purchases);
      })
      .catch((error) => {
        console.error("Error getting user data:", error);
      });
  };

  useEffect(() => {
    if (isLoaded && user) {
      fetchUserData(user.id);
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {purchases.length > 0 ? (
              purchases.map((item, index) => (
                <div
                  key={index}
                  className="border border-black rounded-md p-4 shadow-lg"
                >
                  <div className="bg-gray-200 text-gray-400 border-black border rounded-md w-fit text-3xl px-4 py-2">
                    ?
                  </div>
                  <h1 className="mt-2">{item.item.ItemName}</h1>
                  <div className="flex items-center gap-2">
                    <p className="">{item.box.BoxName}</p>
                    {/* <Link
                      href={"/allboxes"}
                      className="cursor-pointer no-underline"
                    >
                      <button className="flex justify-center items-center w-fit hover:underline">
                        See {item.box.BoxName}
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
                    </Link> */}
                  </div>

                  <p className="text-xs text-gray-400 mt-6">
                    Purchased on: {new Date(item.timestamp).toLocaleString()}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="mt-1 bg-gray-100 border border-green-600 text-green-600 rounded-md max-w-fit py-1 px-2">
                      Value: ${item.item.ItemValue}
                    </p>
                    <p className="mt-1">Purchased for: ${item.box.BoxPrice}</p>
                  </div>
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
