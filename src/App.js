import React, { Component } from "react";
import Search from "./components/Search";
import Table from "./components/Table";
// api constants imported from API component;
import { DEFAULT_QUERY, url } from "./API";
import "./App.css";

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };
  }

  componentDidMount() {
    fetch(url)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => console.log(error, "error on fetch"));
    console.log(url);
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
          <Search value={searchTerm} onChange={this.onInputChange}>
            Search
          </Search>
        </div>
        {result && (
          <Table
            list={result.hits}
            onDismiss={this.onDismiss}
            pattern={searchTerm}
            isSearched={isSearched}
          />
        )}
      </div>
    );
  }
}

export default App;
