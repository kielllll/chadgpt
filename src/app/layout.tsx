"use client";

import "~/styles/globals.css";

import { api } from "~/utils/api";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export default api.withTRPC(RootLayout);
