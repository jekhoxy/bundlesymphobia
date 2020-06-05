import React from "react";
import styled from "styled-components";

// STYLED
const Container = styled.div`
  color: red;
  font-size: 12px;
`;

/**
 * Display an error message in red color
 */
export default function Error({ message }) {
  return <Container>{message}</Container>;
}
