import React from "react";
import Link from "next/link";
import styled from "styled-components";

import { Session } from "next-auth-custom/types";
import { Col, Navbar } from "react-bootstrap";

import Avatar from "components/auth/Avatar";
import SignOutButton from "components/auth/SignOutButton";
import GoogleLoginButton from "components/auth/GoogleLoginButton";
import ThemeToggleSwitch from "components/themes/ThemeToggleSwitch";

import { Theme } from "types/themes";

function NavBar({
  session,
  themeToggler,
}: {
  session: Session;
  themeToggler: Theme["themeToggler"];
}) {
  return (
    <StyledNavbar className="mb-0">
      <Col md={2}>
        <h1>ChessKid Charts</h1>
      </Col>
      <Col md={7}></Col>
      <ThemeToggleSwitch themeToggler={themeToggler} />
      <Col className="my-auto" md={1}>
        {session && <SignOutButton />}
      </Col>
      <Col md={1}>
        {session && (
          <Link href="/settings" passHref>
            <a>
              <Avatar src={session?.user?.image} />
            </a>
          </Link>
        )}
        {!session && <GoogleLoginButton prompt="Login" />}
      </Col>
    </StyledNavbar>
  );
}

const StyledNavbar = styled(Navbar)`
  border-bottom: 1px solid ${(props) => props.theme.fontColor};
  color: ${(props) => props.theme.fontColor};
  left: 50%;
  transform: translatex(-50%);
  width: 95%;
  margin-bottom: 2rem;
  white-space: nowrap;
`;

export default NavBar;
