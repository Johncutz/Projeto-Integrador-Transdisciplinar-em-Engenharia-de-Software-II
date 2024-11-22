import { CartContextProvider } from "@/hooks/useCart";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </SessionProvider>
  );
}
