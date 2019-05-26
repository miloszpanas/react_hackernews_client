import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import Sort from "./Sort";

const largeColumn = {
  flex: 4,
  overflow: "hidden",
  textOverflow: "ellipsis",
  marginRight: "1rem"
};

const mediumColumn = {
  flex: 3
};

const smallColumn = {
  flex: 1
};

const Table = ({ list, onDismiss, sortKey, onSort, sortContent, isSortingReverse }) => {
  const sortedList = sortContent[sortKey](list);
  const reverseSortedList = isSortingReverse ? sortedList.reverse() : sortedList;

  return (
    <div className="table">
      <div className="table-header">
        <span style={largeColumn}>
          <Sort
            sortKey="TITLE"
            onSort={onSort}
            activeSortKey={sortKey}
          >
            Title
          </Sort>
        </span>
        <span style={mediumColumn}>
          <Sort
            sortKey="AUTHOR"
            onSort={onSort}
            activeSortKey={sortKey}
          >
            Author
          </Sort>
        </span>
        <span style={smallColumn}>
          <Sort
            sortKey="COMMENTS"
            onSort={onSort}
            activeSortKey={sortKey}
          >
            Comments
          </Sort>
        </span>
        <span style={smallColumn}>
          <Sort
            sortKey="POINTS"
            onSort={onSort}
            activeSortKey={sortKey}
          >
            Points
          </Sort>
        </span>
        <span style={smallColumn}/>
      </div>
      {reverseSortedList.map(item => (
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
}

Table.propTypes = {
  list: PropTypes.array.isRequired,
  onDismiss: PropTypes.func.isRequired
};

export default Table;
