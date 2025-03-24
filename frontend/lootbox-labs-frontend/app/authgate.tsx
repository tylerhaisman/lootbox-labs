"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserSync } from "../hooks/useUserSync"; // Import the hook

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const clerk = useClerk();
  const router = useRouter();
  
  // This will sync the user data with our backend
  useUserSync();

  useEffect(() => {
    if (isLoaded && user && !user.primaryEmailAddress?.emailAddress.endsWith("@ufl.edu")) {
      // Sign out and redirect immediately to /unauthorized
      clerk.signOut().then(() => {
        router.replace("/unauthorized");
      });
    }
  }, [user, isLoaded, clerk, router]);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  // If the user is unauthorized, don't render the protected children.
  if (user && !user.primaryEmailAddress?.emailAddress.endsWith("@ufl.edu")) {
    return null;
  }

  return <>{children}</>;
}