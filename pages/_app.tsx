import { createTheme, NextUIProvider } from "@nextui-org/react";
import useBlobity from "blobity/lib/react/useBlobity";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "react-query";
import { createContext, useContext, useEffect } from "react";
import Blobity from "blobity";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

const BlobityContext = createContext<Blobity | null>(null);

export const useBlobityInstance = () => {
  const blobity = useContext(BlobityContext);

  return blobity;
};

function MyApp({ Component, pageProps }) {
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
        //primary: "$red600",
        link: "$red600",
        gradient:
          "linear-gradient(112deg, $red600 -25%, $red800 85%, $red900 100%)",
      },
    },
  });

  return (
    <NextUIProvider theme={theme}>
      <BlobityContext.Provider value={null}>
        <QueryClientProvider client={queryClient}>
          <div style={{ ...inter.style }}>
            <Component {...pageProps} />
          </div>
        </QueryClientProvider>
      </BlobityContext.Provider>
    </NextUIProvider>
  );
}

export default MyApp;
