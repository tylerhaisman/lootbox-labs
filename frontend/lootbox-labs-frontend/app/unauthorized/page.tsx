"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/"); // Redirect to the main page after 5 seconds
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Access Denied</h1>
      <p>Only @ufl.edu emails are allowed.</p>
      <p>Redirecting to the home page in a few seconds...</p>
    </div>
  );
}