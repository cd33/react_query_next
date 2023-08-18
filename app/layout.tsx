import "./globals.css";
import type { Metadata } from "next";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import BackButton from "@/components/BackButton";
import QueryWrapper from "./QueryWrapper";

export const metadata: Metadata = {
  title: "Tuto React Query",
  description: "cd33",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-gray-50">
        <QueryWrapper>
          <BackButton />
          {children}
          <ReactQueryDevtools />
        </QueryWrapper>
      </body>
    </html>
  );
}
