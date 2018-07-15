import React from "react";
import styled from "styled-components";
import { scaleQuantize } from "d3-scale";
import StatusCode from "./StatusCode";

let scale = [
  "#a50026",
  "#d73027",
  "#1a9850",
  "#1a9850",
  "#1a9850",
  "#1a9850",
  "#006837",
  "#006837",
  "#006837",
  "#006837"
].reverse();

let colorScale = scaleQuantize().range(scale);

const List = styled.ul`
  list-style: none;
`;

const Item = styled.li`
  margin: 0;
`;

export const ResultList = props => {
  let { results } = props;
  let scale = colorScale.copy().domain(results.map(result => result.time));
  return (
    <List>
      {results.map(result => (
        <Item key={result.run}>
          <span style={{ color: scale(result.time) }}>
            {result.time.toFixed(2)} ms
          </span>{" "}
          <StatusCode response={result.response} />
        </Item>
      ))}
    </List>
  );
};
