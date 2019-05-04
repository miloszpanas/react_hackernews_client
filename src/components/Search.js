import React from "react";
import Button from "./Button";

export const Search = ({ value, onChange, children }) => (
  <form action="">
    <input
      type="search"
      value={value}
      onChange={onChange}
    />
    <button type="button">{children}</button>
  </form>
);
