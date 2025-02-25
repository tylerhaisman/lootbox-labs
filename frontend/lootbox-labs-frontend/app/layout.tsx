import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import AuthGate from "./authgate"; // Import the Client Component
console.log("AuthGate:", AuthGate);

export const metadata: Metadata = {
  title: "LootBox Labs",
  description: "Unbox the unexpected",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <AuthGate>{children}</AuthGate>
        </body>
      </html>
    </ClerkProvider>
  );
}
