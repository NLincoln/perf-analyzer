import React from "react";
import styled from "styled-components";
import { FormGroup, FormLabel, FormInput } from "./components/Form";

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
`;

export default function HeadersInput(props) {
  function onChange(headers) {
    props.onChange(
      headers
        .filter(header => header.key !== "" || header.value !== "")
        .concat({
          key: "",
          value: ""
        })
    );
  }
  return (
    <FormGroup>
      <FormLabel>Headers</FormLabel>
      {props.value.map((header, i) => {
        let onValueChange = key => event => {
          let nextState = props.value.map(h => {
            if (header.key === h.key) {
              return {
                ...h,
                [key]: event.target.value
              };
            }
            return h;
          });
          onChange(nextState);
        };
        return (
          <HeaderRow key={i}>
            <FormInput
              placeholder={"key"}
              value={header.key}
              onChange={onValueChange("key")}
            />
            <FormInput
              placeholder={"value"}
              value={header.value}
              onChange={onValueChange("value")}
            />
          </HeaderRow>
        );
      })}
    </FormGroup>
  );
}
