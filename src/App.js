import React, { Component } from "react";
import Search from "./components/Search";
import Table from "./components/Table";
// api constants imported from API component;
import { DEFAULT_QUERY, PATH_BASE, PATH_SEARCH, PARAM_SEARCH, url } from "./API";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };
  }

  fetchSearchTopStories = (searchTerm) => {
    fetch(`${PATH_BASE}${PATH_SEARCH}${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  onSearchSubmit = (event) => {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }

  setSearchTopStories(result) {
    this.setState({ result });
  }

  onDismiss = id => {
    const { result } = this.state;
    const isNotId = item => item.objectID !== id;
    const updatedHits = result.hits.filter(isNotId);
    this.setState({
      result: { ...result, hits: updatedHits }
    });
  };

  onInputChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { result, searchTerm } = this.state;
    console.log("pokaz stan", this.state);
    console.log("result?", result);

    return (
      <div className="page">
        <div className="interactions">
          <Search 
            value={searchTerm}
            onChange={this.onInputChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        {result && (
          <Table
            list={result.hits}
            onDismiss={this.onDismiss}
          />
        )}
      </div>
    );
  }
}

export default App;
