import React, { Component } from "react";
import { PacmanLoader } from "react-spinners";

import { Search } from "./components/Search";
import Table from "./components/Table";
import "./App.css";

const DEFAULT_QUERY = "redux";
const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search?";
const PARAM_SEARCH = "query=";
const url = `${PATH_BASE}${PATH_SEARCH}${PARAM_SEARCH}${DEFAULT_QUERY}`;

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  state = {
    // list,
    result: null,
    searchTerm: DEFAULT_QUERY,
    loading: true
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
    const { result } = this.state;
    const updatedHits = result.hits.filter(item => item.objectID !== id);
    this.setState({
      result: { ...result, hits: updatedHits }
    });
  };

  onSearchChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { result, searchTerm } = this.state;
    // console.log(this.state);
    console.log(result);

    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            Search
          </Search>
        </div>
        {result ? (
          <Table
            list={result.hits}
            searchTerm={searchTerm}
            isSearched={isSearched}
            onDismiss={this.onDismiss}
          />
        ) : (
          <div className="loader-wrapper">
            <PacmanLoader
              sizeUnit="px"
              size={150}
              color="#e3e3e3"
              loading={this.state.loading}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
