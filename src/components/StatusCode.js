import React from "react";

export default function StatusCode(props) {
  let { response } = props;
  let { status } = response;
  let color = "green";
  // Treat 4xx and 5xx as erros
  if (status >= 400) {
    color = "red";
  }
  return (
    <span style={{ color }}>
      ({status} {response.statusText})
    </span>
  );
}
