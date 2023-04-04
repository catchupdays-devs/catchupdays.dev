import { createTheme, NextUIProvider, useSSR } from "@nextui-org/react";
import useBlobity from "blobity/lib/react/useBlobity";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "react-query";
import React, { createContext, useContext, useEffect } from "react";
import Blobity from "blobity";
import "@/app/globals.css";
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

const BlobityContext = createContext<Blobity | null>(null);

export const useBlobityInstance = () => {
  const blobity = useContext(BlobityContext);

  return blobity;
};

function MyApp({
  Component,
  pageProps,
}: {
  Component: React.FC;
  pageProps: any;
}) {
  const { isBrowser } = useSSR();
  // const blobityInstance = useBlobity({
  //   licenseKey: "gmrchk",
  //   zIndex: 1,
  //   opacity: 0.4,
  //   magnetic: false,
  //   radius: 12,
  //   focusableElementsOffsetX: 5,
  //   focusableElementsOffsetY: 5,
  // });

  // useEffect(() => {
  //   if (blobityInstance.current) {
  //     // @ts-ignore for debugging purposes or playing around
  //     window["blobity"] = blobityInstance.current;
  //   }
  // }, [blobityInstance]);

  const theme = createTheme({
    type: "light",
    theme: {
      colors: {
        primary: "$red800",
        //link: "$red600",
        primaryLight: "$gray200",
        primaryLightHover: "$red400", // commonly used on pressed state

        primaryActive: "$red400", // commonly used on pressed state
        primaryLightActive: "$red400", // commonly used on pressed state
        primaryLightContrast: "$red800", // commonly used for text inside the component
        primaryBorder: "$red500",
        primaryBorderHover: "$red600",
        primarySolidHover: "$red700",
        primarySolid: "$red700",

        primaryShadow: "$red500",

        gradient:
          "linear-gradient(112deg, $red600 -25%, $red800 85%, $red900 100%)",
      },
    },
  });

  return (
    isBrowser && (
      <NextUIProvider theme={theme}>
        <BlobityContext.Provider value={null}>
          <QueryClientProvider client={queryClient}>
            <div style={{ ...inter.style }}>
              <Navigation />
              <Component {...pageProps} />
              <Footer />
            </div>
          </QueryClientProvider>
        </BlobityContext.Provider>
      </NextUIProvider>
    )
  );
}

export default MyApp;
