import styled from "styled-components";

/**
 * Define div for an Icon
 */
export const Icon = styled.div`
  vertical-align: middle;
  display: flex;
  transition: color 125ms ease-in;
  font-size: ${(props) => props.fontSize};
`;

Icon.defaultProps = {
  fontSize: "inherit",
};

/**
 * Define a rotated Icon
 */
export const RotateIcon = styled(Icon)`
  animation: ${(props) =>
    props.rotate ? `App-logo-spin infinite ${props.duration} linear` : "none"};
`;

RotateIcon.defaultProps = {
  rotate: false,
  duration: "2s",
};
