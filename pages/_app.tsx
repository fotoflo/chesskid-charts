import "../styles/globals.css";
import type { AppProps } from "next/app";

import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "components/themes/Themes";
import useLocalStorage from "hooks/useLocalStorage";

const DEFAULT_THEME = process.env.REACT_APP_DEFAULT_THEME;

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useLocalStorage("theme", DEFAULT_THEME);
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <>
      <GlobalStyles theme={theme == "light" ? lightTheme : darkTheme} />
      <ThemeProvider theme={theme == "light" ? lightTheme : darkTheme}>
        <Component {...pageProps} theme={theme} themeToggler={themeToggler} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
