import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/index.css";
import { sansFont, serifFont } from "@/lib/fonts";
import { init } from "./init";
import type { Viewport } from "next";
import { WebAppProviders } from "@/providers/root";
import { Root } from "@/components/layout/root/Root";
import { AccentColorStyleInjector } from "@/components/modules/shared/AccentColorStyleInjector";
import { TocAutoScroll } from "@/components/modules/toc/TocAutoScroll";
import { Analyze } from "./analyze";
import { ScrollTop } from "@/components/common/ScrollTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dalvae Portfolio",
  description: "Here is the showcase of my work",
};

init();

export function generateViewport(): Viewport {
  return {
    themeColor: [
      { media: "(prefers-color-scheme: dark)", color: "#000212" },
      { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    ],
    width: "device-width",
    initialScale: 1,
    userScalable: false,
    minimumScale: 1,
    maximumScale: 1,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="noise">
      <head>
        <AccentColorStyleInjector />
      </head>
      <body
        className={`${sansFont.variable} ${serifFont.variable} m-0 h-full p-0 font-sans`}
      >
        {" "}
        <WebAppProviders>
          <div data-theme>
            <Root>{children}</Root>
          </div>

          <TocAutoScroll />
          <Analyze />
        </WebAppProviders>
        <ScrollTop />
      </body>
    </html>
  );
}
