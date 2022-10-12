import { PropsWithoutRef } from "react";
import styled from "styled-components";
export default function Loading({
  block,
}: PropsWithoutRef<{ block: boolean }>) {
  return block ? <Loader>Loading</Loader> : null;
}

const Loader = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;
