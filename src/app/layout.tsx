import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tran Tan Thinh | Computer Science & AI",
  description:
    "Computer Science student at HCMUT. Projects, learning milestones, and notes on AI, Machine Learning, and Computer Vision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
