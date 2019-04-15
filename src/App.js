import React, { Component } from "react";
import Search from "./components/Search";
import Table from "./components/Table";
import Button from "./components/Button";
// api constants imported from API component;
import { DEFAULT_QUERY, PATH_BASE, PATH_SEARCH, PARAM_SEARCH, PARAM_PAGE } from "./API";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };
  }

  fetchSearchTopStories = (searchTerm, page = 0) => {
    fetch(`${PATH_BASE}${PATH_SEARCH}${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
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
    const { hits, page } = result;

    const oldHits = page !== 0 ? this.state.result.hits : [];

    const updatedHits = [
      ...oldHits,
      ...hits
    ]
    this.setState({ result: { hits: updatedHits, page } });
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
    const page = (result && result.page) || 0;
    console.log("pokaz stan", this.state);

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
        <div className="interactions">
          <Button
            onClick={() => this.fetchSearchTopStories(searchTerm, page +1)}
          >
            More
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
