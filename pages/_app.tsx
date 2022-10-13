import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

import { SSRProvider } from "@react-aria/ssr";

import type { AppProps } from "next/app";

import { ThemeProvider } from "styled-components";
import {
  darkTheme,
  GlobalStyles,
  lightTheme,
  useTheme,
} from "components/themes/Themes";

import { SessionProvider, useSession } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [theme] = useTheme();

  console.log("_app theme", theme);

  return (
    <>
      <GlobalStyles theme={theme == "light" ? lightTheme : darkTheme} />
      <SSRProvider>
        <SessionProvider session={session}>
          <ThemeProvider theme={theme == "light" ? lightTheme : darkTheme}>
            {Component.auth ? (
              <Auth>
                <Component {...pageProps} auth={true} theme={theme} />
              </Auth>
            ) : (
              <Component {...pageProps} auth={false} theme={theme} />
            )}
          </ThemeProvider>
        </SessionProvider>
      </SSRProvider>
    </>
  );
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}

export default MyApp;
