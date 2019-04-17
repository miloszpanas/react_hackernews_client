import React, { Component } from "react";
import { Search } from "./components/Search";
import Table from "./components/Table";
import "./App.css";

const DEFAULT_QUERY = "react";
const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search?";
const PARAM_SEARCH = "query=";
const url = `${PATH_BASE}${PATH_SEARCH}${PARAM_SEARCH}${DEFAULT_QUERY}`;

// const list = [
//   {
//     title: "React",
//     url: "https://reactjs.org/",
//     author: "Jordan Walke",
//     num_comments: 3,
//     points: 4,
//     objectID: 0
//   },
//   {
//     title: "Redux",
//     url: "https://redux.js.org/",
//     author: "Dan Abramov, Andrew Clark",
//     num_comments: 2,
//     points: 5,
//     objectID: 1
//   }
// ];


const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  state = {
    // list,
    result: null,
    searchTerm: DEFAULT_QUERY
  };

  componentDidMount() {
    const { searchTerm } = this.state;
    console.log(url);
    fetch(`${PATH_BASE}${PATH_SEARCH}${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  setSearchTopStories = result => {
    this.setState({ result });
  };

  onDismiss = id => {
    const { list } = this.state;
    const updatedList = list.filter(item => item.objectID !== id);
    this.setState({
      list: updatedList
    });
  };

  onSearchChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { result, searchTerm } = this.state;

    if (!result) {
      return null;
    }

    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            Search
          </Search>
          <Table
            list={result.hits}
            searchTerm={searchTerm}
            isSearched={isSearched}
            onDismiss={this.onDismiss}
          />
        </div>
      </div>
    );
  }
}

export default App;
