import React, { Component } from "react";
import { PacmanLoader } from "react-spinners";

import { Search } from "./components/Search";
import Table from "./components/Table";
import Button from "./components/Button";
import "./App.css";

const DEFAULT_QUERY = "redux";
const DEFAULT_HPP = "5";

const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search?";
const PARAM_SEARCH = "query=";
const PARAM_PAGE = "page=";
const PARAM_HPP = "hitsPerPage=";

class App extends Component {
  state = {
    results: null,
    searchKey: "",
    searchTerm: DEFAULT_QUERY,
    loading: true
  };

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  setSearchTopStories = result => {
    const { hits, page } = result;
    const { searchKey, results } = this.state;

    const oldHits =
      results && results[searchKey] ? results[searchKey].hits : [];

    const updatedHits = [...oldHits, ...hits];

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  };

  fetchSearchTopStories = (searchTerm, page = 0) => {
    const url = `${PATH_BASE}${PATH_SEARCH}${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;
    fetch(url)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
    console.log(url);
  };

  onSearchChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  needsToSearchTopStories = (searchTerm) => !this.state.results[searchTerm];

  onSearchSubmit = event => {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });

    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }

    event.preventDefault();
  }

  onDismiss = id => {
    const { results, searchKey } = this.state;
    const { hits, page } = results[searchKey];
    const updatedHits = hits.filter(item => item.objectID !== id);
    this.setState({
      results: { ...results, [searchKey]: { hits: updatedHits, page } }
    });
  };

  render() {
    const { results, searchTerm, searchKey } = this.state;

    const page =
      (results && results[searchKey] && results[searchKey].page) || 0;

    const list =
      (results && results[searchKey] && results[searchKey].hits) || [];

    console.log(results);

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        {results ? (
          <Table list={list} onDismiss={this.onDismiss} />
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
        <div className="interactions">
          <Button
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
          >
            More
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
