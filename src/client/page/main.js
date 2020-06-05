import React from "react";
import styled from "styled-components";
import BundleSearchAutocomplete from "../component/bundle/bundle-search-autocomplete";
import CenterContainer from "../component/layout/center-container";
import logo from "../logo.svg";

// STYLED
const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
`;

/**
 * Main page that display a search input
 */
export default function Main() {
  return (
    <CenterContainer>
      <SubContainer>
        <img src={logo} className="App-logo" alt="logo" />
        <h3>Find the cost of adding a npm package to your bundle</h3>
        <BundleSearchAutocomplete />
      </SubContainer>
    </CenterContainer>
  );
}
