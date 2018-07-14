import styled, { css } from "styled-components";

const Card = styled.div`
  border-radius: 5px;
  position: relative;
  background-color: #4a4238;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

export const CardHeader = styled.div`
  padding: 24px;
  text-transform: uppercase;
  text-align: center;
  font-family: "Source Code Pro";
`;

export const CardContent = styled.div`
  padding: 24px;
  background-color: white;
  color: #222;

  ${props =>
    props.centered &&
    css`
      display: flex;
      justify-content: center;
    `};
`;

export default Card;
