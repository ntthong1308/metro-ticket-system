import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MetroNext - Hệ thống vé điện tử Metro",
    template: "%s | MetroNext",
  },
  description: "Hệ thống vé điện tử Metro - Nhanh chóng, tiện lợi, an toàn",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
