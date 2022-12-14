import React, { useContext, useState } from "react";
import { ThemeContext } from "styled-components";
import styled from "styled-components";
import { lightTheme, darkTheme } from "components/themes/Themes";

const DEFAULT_THEME = process.env.REACT_APP_DEFAULT_THEME;

function ThemeToggleSwitch({ themeToggler, ...props }) {
  //consume the theme context
  const themeContext = useContext(ThemeContext);
  const [checked, setChecked] = useState(
    themeContext.themeName !== DEFAULT_THEME
  );

  const handleChange = () => {
    setChecked(!checked);
    themeToggler();
  };

  return (
    <CheckboxContainer onClick={handleChange}>
      <HiddenCheckbox checked={checked} readOnly />
      <VisableCheckbox checked={checked} readOnly />
    </CheckboxContainer>
  );
}

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
`;

// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const VisableCheckbox = styled.div`
  width: 16px;
  height: 16px;
  background: ${(props) => props.theme.fontColor};
  border-radius: 3px;
`;

export default ThemeToggleSwitch;
