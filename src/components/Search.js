import React from "react";

export const Search = ({ value, onChange, children, onSubmit}) => (
  <form onSubmit={onSubmit}>
    <input
      id="Search"
      type="search"
      value={value}
      onChange={onChange}
    />
    <button
      type="submit"
    >
      {children}
    </button>
  </form>
);
