import React from "react";
import styled from "styled-components";

// STYLED
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: calc(10px + 2vmin);
  height: 100%;
  width: 100%;
`;

/**
 * A <div> that centers its content
 */
export default function CenterContainer({ children }) {
  return <Container>{children}</Container>;
}
