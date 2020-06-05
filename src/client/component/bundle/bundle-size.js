import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { formatValue } from "../../util/sizeUtil";

// STYLED
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ValueContainer = styled.div`
  display: flex;
  align-items: flex-end;

  & > label {
    margin: 0 2px;
  }
`;

const Title = styled.h4`
  margin-top: -5px;
`;

const Value = styled.label`
  font-size: xxx-large;
`;

const Unit = styled.label`
  color: gray;
  font-size: xx-large;
  font-weight: 700;
`;

/**
 *
 * Display a HDD size with unit (default kB).
 * The size is incremented from 0 to size (like a counter)
 *
 */
export default function BundleSize({ title, size, unit = "kB" }) {
  const step = size / 10;
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(0);
  }, [size]);

  if (value < size) {
    setTimeout(() => setValue(Math.min(value + step, size)), 50);
  }

  return (
    <Container>
      <ValueContainer>
        <Value>{formatValue(value)}</Value> <Unit>{unit}</Unit>
      </ValueContainer>
      <Title>{title}</Title>
    </Container>
  );
}
