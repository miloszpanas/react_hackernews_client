import React from "react";
import PropTypes from "prop-types";

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

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};
