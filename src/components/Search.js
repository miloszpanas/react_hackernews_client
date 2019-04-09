import React from "react";

const Search = ({ children, value, onChange }) => (
  <div>
    <form>
      {children}
      <input 
        type="text"
        value={value}
        onChange={onChange} 
      />
    </form>
  </div>
);

export default Search;
