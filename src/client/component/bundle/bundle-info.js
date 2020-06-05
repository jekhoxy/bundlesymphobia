import React from "react";
import { BsInfoCircle } from "react-icons/bs";
import { FaGithub, FaNpm } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import styled from "styled-components";
import { Icon } from "../layout/icon";

// STYLED
const Container = styled.div`
  font-size: small;
  color: gray;
  background-color: #80808021;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const SubContainer = styled.div`
  display: flex;
  align-items: center;

  margin: 0 5px;

  & * {
    margin: 0 2px;
  }
`;

const NPMLink = styled(Icon)`
  font-size: 30px;

  &:hover {
    color: red;
  }
`;

const GitHubLink = styled(Icon)`
  font-size: 20px;

  &:hover {
    color: black;
  }
`;

// COMPONENT
/**
 * Component that displays Bundle info such as name, description, dependencies and repository
 *
 */
export default function BundleInfo({
  name,
  description,
  dependencies,
  repository,
}) {
  const { url } = repository;
  const urlRepo = url ? url.slice(4) : "";

  return (
    <Container>
      <SubContainer>
        <Icon>
          <BsInfoCircle />
        </Icon>
        <i>{description} </i>
      </SubContainer>
      <SubContainer>|</SubContainer>
      <SubContainer>
        <Icon>
          <GoPackage />
        </Icon>
        {dependencies} dependencies{" "}
      </SubContainer>
      <SubContainer>|</SubContainer>
      <SubContainer>
        <a
          href={`https://npmjs.org/package/${name}`}
          target="_blank"
          rel="noopener noreferrer">
          <NPMLink>
            <FaNpm />
          </NPMLink>
        </a>
        <a href={urlRepo} target="_blank" rel="noopener noreferrer">
          <GitHubLink>
            <FaGithub />
          </GitHubLink>
        </a>
      </SubContainer>
    </Container>
  );
}
