import React from "react";

export default function StatusCode(props) {
  let { code } = props;
  let color = "green";
  // Treat 4xx and 5xx as erros
  if (code >= 400) {
    color = "red";
  }
  return <span style={{ color }}>({code})</span>;
}
