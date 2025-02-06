import type { Metadata } from "next";
import "./css/globals.css";
import 'boxicons/css/boxicons.min.css';

export const metadata: Metadata = {
  title: "Mangahas, Miguel | Technical A",
  description: "Thank you for reading this",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
