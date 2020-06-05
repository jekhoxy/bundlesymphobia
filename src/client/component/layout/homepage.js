import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// STYLED
const Container = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
`;

const Bundle = styled.span`
  font-weight: 700;
  text-transform: uppercase;
`;

const Sym = styled.span`
  font-weight: 200;
  text-transform: uppercase;
`;

/**
 * Display a link to homepage in the top left corner
 */
export default function Homepage() {
  return (
    <Container>
      <Link to="/">
        <Bundle>Bundle</Bundle>
        <Sym>Symphobia</Sym>
      </Link>
    </Container>
  );
}
