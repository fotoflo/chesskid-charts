import React from "react";
import { FaGoogle } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { signIn } from "next-auth/react";
import styled from "styled-components";

type ButtonProps = {
  prompt?: string;
  provider?: "google" | "gmail";
};

const GoogleLoginButton: React.FC<ButtonProps> = ({
  prompt = "Login with Google",
  provider = "google",
}) => {
  return (
    <Button variant="primary" onClick={() => signIn(provider)}>
      <span>
        <FaGoogle />
      </span>
      &nbsp;&nbsp;
      {prompt}
    </Button>
  );
};

// const GoogleButton = styled(Button)`
//   display: block;
//   margin: 10px 0px;
// `;

export default GoogleLoginButton;
