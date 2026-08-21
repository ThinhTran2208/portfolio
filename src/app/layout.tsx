import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tấn Thịnh — Portfolio",
  description: "Computer Science portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
