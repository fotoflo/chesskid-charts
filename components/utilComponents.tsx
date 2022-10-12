import React from "react";

import { consoleObj, httpRegex } from "lib/utils";
import { FaLink } from "react-icons/fa";

import { Button } from "react-bootstrap";

import { IS_LOCAL_ENV } from "next.config";

import styled from "styled-components";

export const DebugButton = (props) => {
  const debug = () => {
    consoleObj(props);
  };

  return (
    <>{IS_LOCAL_ENV && <Button onClick={() => debug()}>&nbsp; Debug</Button>}</>
  );
};

export const PrettyPrintJson = ({ data }) => {
  return (
    <Root>
      <Pre>{JSON.stringify(data, null, 2)}</Pre>
    </Root>
  );
};

const Pre = styled.pre`
  display: block;
  padding: 10px 30px;
  margin: 0;
`;

const Root = styled.div`
  font-size: 12px;
`;

export const parseUrlToLink = (item) => {
  let itemLink = item;
  if (!item.match(httpRegex)) {
    itemLink = "https://" + item;
  }
  return {
    item: (
      <a href={itemLink} target="_blank" rel="noopener noreferrer">
        {item}
      </a>
    ),
    action: (
      <a href={itemLink} target="_blank" rel="noopener noreferrer">
        <FaLink />
      </a>
    ),
  };
};
