import React from "react";
import styled from "styled-components";
import BundleSize from "./bundle-size";

// STYLED
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SizesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 20px 0px;

  & > div {
    margin: 0 25px;
  }
`;

/**
 * Display bundle info size in textual way
 */
export default function BundleSizesInfo({ size }) {
  return (
    <Container>
      <h2>bundle size</h2>
      <SizesContainer>
        <BundleSize title={"initial"} size={size.initialSize} />
        <BundleSize title={"minified"} size={size.minifySize} />
        <BundleSize title={"gzipped"} size={size.gzipSize} />
      </SizesContainer>
    </Container>
  );
}
