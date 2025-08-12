"use client";

import { Provider } from "react-redux";
import "./globals.css";
import { store } from "@/store";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased dark:bg-medium transition-all duration-300">
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
