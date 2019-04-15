import React from "react";

const Search = ({ children, value, onChange, onSubmit }) => (
  <div>
    <form onSubmit={onSubmit}>
      <input type="text" value={value} onChange={onChange} />
      <button type="submit">{children}</button>
    </form>
  </div>
);

export default Search;
