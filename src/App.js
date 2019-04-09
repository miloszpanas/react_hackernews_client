import React, { Component } from "react";
import Search from "./components/Search";
import Table from "./components/Table";
import "./App.css";

const list = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1
  }
];

const isSearched = searchTerm => item =>
item.title.toLowerCase().includes(searchTerm.toLowerCase());


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list,
      name: "miłosz",
      isGoodProgrammer: true,
      searchTerm: ""
    };
  }

  toggleGoodProgrammer = () => {
    this.setState(prevState => ({
      isGoodProgrammer: !prevState.isGoodProgrammer
    }));
  };
  
  onDismiss = (id) => {
    const updatedState = this.state.list.filter(item => (item.objectID !== id));
    this.setState({ list: updatedState});
    console.log(this);
  }

  onInputChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  }

  render() {
    const { list, isGoodProgrammer, searchTerm } = this.state;
    console.log(searchTerm)
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
            list={list}
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
