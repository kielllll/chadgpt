"use client";
import { Provider } from "jotai";

import "./globals.css";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

export default RootLayout;
