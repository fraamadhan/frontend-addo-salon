import type { Metadata } from "next";
import "./globals.css";
import "./styles/app.css"
import { federo, lora } from "./components-local/fonts";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Addo Salon",
  description: "Addo Salon Web Application",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lora.className} ${federo.className} antialiased`}
      >

        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
