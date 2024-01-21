// En tu archivo _app.tsx

import { ChakraProvider } from "@chakra-ui/react";
import { AlertProvider } from "../context/alertContext";
import theme from "../theme";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AlertProvider>
        <Component {...pageProps} />
      </AlertProvider>
    </ChakraProvider>
  );
}

export default MyApp;
