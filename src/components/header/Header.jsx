import React from "react";

export default function Header({headerTitle}) {
  return (
    <div className="header">
      <hr />
      <h1>{headerTitle}</h1>
      <hr />
    </div>
  );
}
