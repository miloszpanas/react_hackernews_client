import React, { Component } from "react";
import PropTypes from "prop-types";

export class Search extends Component {
  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }

  render() {
    const { onSubmit, value, onChange, children } = this.props;
    return (
      <form onSubmit={onSubmit}>
        <input
          id="Search"
          type="search"
          value={value}
          onChange={onChange}
          ref={el => this.input = el}
        />
        <button
          type="submit"
        >
          {children}
        </button>
      </form>
    );
  }
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};
