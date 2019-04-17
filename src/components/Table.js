import React from "react";
import Button from "./Button";

const largeColumn = {
  flex: 4
};

const mediumColumn = {
  flex: 3
};

const smallColumn = {
  flex: 1
};
const Table = ({ list, searchTerm, isSearched, onDismiss }) => (
  <div className="table">
    {list.filter(isSearched(searchTerm)).map(item => (
      <div key={item.objectID} className="table-row">
        <span style={largeColumn}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={mediumColumn}>{item.author}</span>
        <span style={smallColumn}>{item.num_comments}</span>
        <span style={smallColumn}>{item.points}</span>
        <span style={smallColumn}>
          <Button
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >
            Remove
          </Button>
        </span>
      </div>
    ))}
  </div>
);

export default Table;
