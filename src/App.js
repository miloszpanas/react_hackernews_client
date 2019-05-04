import React, { Component } from "react";
import { PacmanLoader } from "react-spinners";

import { Search } from "./components/Search";
import Table from "./components/Table";
import Button from "./components/Button";
import "./App.css";

const DEFAULT_QUERY = "redux";
const DEFAULT_HPP = "10";

const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search?";
const PARAM_SEARCH = "query=";
const PARAM_PAGE = "page=";
const PARAM_HPP = "hitsPerPage=";

class App extends Component {
  state = {
    // list,
    result: null,
    searchTerm: DEFAULT_QUERY,
    loading: true
  };

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  fetchSearchTopStories = (searchTerm, page = 0) => {
    const url = `${PATH_BASE}${PATH_SEARCH}${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;
    fetch(url)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
    console.log(url);
  };

  onSearchSubmit = event => {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  };

  setSearchTopStories = result => {
    const { hits, page } = result;

    const oldHits = page !== 0 ? this.state.result.hits : [];

    const updatedHits = [
      ...oldHits,
      ...hits
    ];

    this.setState({
      result: { hits: updatedHits, page }
    });
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
    const page = (result && result.page) || 0;
    // console.log(this.state);
    console.log(result);

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
        {result ? (
          <Table list={result.hits} onDismiss={this.onDismiss}/>
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
            onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}
          >
            More
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
