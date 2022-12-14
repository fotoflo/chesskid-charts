import "../styles/globals.css";

import { SSRProvider } from "@react-aria/ssr";

import type { AppProps } from "next/app";

import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "components/themes/Themes";
import useLocalStorage from "hooks/useLocalStorage";

import { SessionProvider, useSession } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.min.css";

import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";

const DEFAULT_THEME = process.env.REACT_APP_DEFAULT_THEME;

import { useTheme } from "../components/themes/Themes";

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  const [theme, themeToggler] = useTheme();

  return (
    <>
      <GlobalStyles theme={theme == "light" ? lightTheme : darkTheme} />
      <SSRProvider>
        <SessionProvider session={session}>
          <ThemeProvider theme={theme == "light" ? lightTheme : darkTheme}>
            {Component.auth ? (
              <Auth>
                <Component
                  {...pageProps}
                  auth={true}
                  theme={theme}
                  themeToggler={themeToggler}
                />
              </Auth>
            ) : (
              <Component
                {...pageProps}
                auth={false}
                theme={theme}
                themeToggler={themeToggler}
              />
            )}
          </ThemeProvider>
        </SessionProvider>
      </SSRProvider>
    </>
  );
};

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}

export default trpc.withTRPC(MyApp);
