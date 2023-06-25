import {
  createTheme,
  CssBaseline,
  NextUIProvider,
  useSSR,
} from "@nextui-org/react";
import useBlobity from "blobity/lib/react/useBlobity";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "react-query";
import React, { createContext, useContext, useEffect } from "react";
import Blobity from "blobity";
import "@/app/globals.css";
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";
import favicon from "@/app/favicon.ico";
import ogImage from "@/app/images/og.png";
import Head from "next/head";
import { globalCss } from "@stitches/react";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

const globalStyles = globalCss({
  body: { margin: 0 },
  p: {
    ...inter.style,
    margin: "0 auto 20px",
  },
  td: {
    whiteSpace: "nowrap",

    a: {
      display: "inline !important",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      maxWidth: "100% !important",

      p: {
        display: "inline !important",
        margin: 0,
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        maxWidth: "100% !important",

        "@media screen and (max-width: 600px)": {
          fontSize: "14px !important",
        },
      },
    },
  },

  ".nextui-dropdown-item-content": {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

const queryClient = new QueryClient();

const BlobityContext = createContext<Blobity | null>(null);

export const useBlobityInstance = () => {
  const blobity = useContext(BlobityContext);

  return blobity;
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: {
  Component: React.FC;
  pageProps: any;
}) {
  const { isBrowser } = useSSR();
  globalStyles();
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
        code: "$red600",
      },
    },
  });

  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href={favicon.src} />
        <meta
          property="og:title"
          content="Catchup Days - Let's Make Open Source Better, Together"
        />
        <meta
          property="og:description"
          content="We connect companies with open source software maintainers to keep the software free and awesome for everyone."
        />
        <meta property="og:image" content={ogImage.src} />
      </Head>
      {isBrowser && (
        <SessionProvider session={session}>
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
        </SessionProvider>
      )}
    </>
  );
}

export default MyApp;
