import type { Metadata } from "next";
import "./globals.css"; // تأكد أن هذا السطر موجود

export const metadata: Metadata = {
  title: "Amazon Clone",
  description: "المتجر الشامل",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}