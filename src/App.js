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
      // list,
      name: "miłosz",
      isGoodProgrammer: true,
      result: null,
      searchTerm: DEFAULT_QUERY
    };
  }

  componentDidMount() {
    fetch(url)
      .then(response => response.json)
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);

      console.log(url);
  }

  setSearchTopStories = (result) => {
    this.setState({ result });
  }

  toggleGoodProgrammer = () => {
    this.setState(prevState => ({
      isGoodProgrammer: !prevState.isGoodProgrammer
    }));
  };
  
  onDismiss = (id) => {
    const { result } = this.state;
    const isNotId = item => item.objectID !== id; 
    const updatedHits = result.hits.filter(isNotId);
    this.setState({
      result: { ...result, hits: updatedHits} 
    });
  }

  onInputChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  }

  render() {
    const { result, isGoodProgrammer, searchTerm } = this.state;
    console.log("pokaz stan", this.state);

    if (!result) { return null }
    return (
      <div className="page">
        <div className="interactions">
          <Search 
            value={searchTerm}
            onChange={this.onInputChange}
          >
            Search
          </Search>
          <Table 
            list={result.hits}
            onDismiss={this.onDismiss}
            pattern={searchTerm}
            toggleIsGood={this.toggleGoodProgrammer}
            isGood={isGoodProgrammer}
            isSearched={isSearched}
          />
        </div>
      </div>
    );
  }
}

export default App;
