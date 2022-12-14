import React from "react";
import { createGlobalStyle } from "styled-components";
// from https://www.youtube.com/watch?v=G00V4tRx1ME

import useLocalStorage from "hooks/useLocalStorage";
const DEFAULT_THEME = process.env.REACT_APP_DEFAULT_THEME;

export const useTheme = () => {
  const [theme, setTheme]: [string, Function] = useLocalStorage(
    "theme",
    DEFAULT_THEME
  );

  const themeToggler = () => {
    console.log(`toggler, ${theme}`); // firing on click
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return [theme, themeToggler];
};

export const lightTheme = {
  themeName: "light",
  background: "white",
  formControl: "white", // a dark grey
  fontColor: "#000", // black
  InfoBGColor: "ivory",
  standout: "#2753FB",
  secondary: "#9E3BA1",
  grey: "#C3C3C3",
  0: "white", // White, Blank
  1: "grey", // not in word, grey
  2: "#EAB935", // wrong slot, yellow
  3: "#61C211", // correct slot, gren
};

export const darkTheme = {
  themeName: "dark",
  background: "#171717", // almost black
  formControl: "#2E2E2E", // a dark grey
  standout: "#E63946", // red
  fontColor: "LightGray", // white
  InfoBGColor: "#240026",
  secondary: "#9E3BA1",
  grey: "#9E9E9E",
  0: "black", // black, Blank
  1: "grey", // not in word, grey
  2: "#EAB935", // wrong slot, yellow
  3: "#61C211", // correct slot, green
};

export const GlobalStyles = createGlobalStyle`
	body {
		background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.fontColor};
    caret-color: transparent;
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      user-select:none;
	}
  input, .public-DraftEditor-content, .form-control{
    caret-color: ${(props) => props.theme.fontColor};
    margin: 5px;
  }
  .form-control{
    background: ${(props) => props.theme.formControl};
    color: ${(props) => props.theme.fontColor};
  }
  .public-DraftEditor-content:focus, .form-control:focus {
    border-radius: 2px;
    background: ${(props) => props.theme.InfoBGColor};
    color: ${(props) => props.theme.fontColor};
  }
`;
