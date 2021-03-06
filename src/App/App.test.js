import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App, { Search, Button, Table } from "./App";

Enzyme.configure({ adapter: new Adapter() });

describe("App", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(
      <App/>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Search", () => {
  const props = {
    value: "a",
    onChange: () => {},
    children: "a",
    onSubmit: () => {}
  };

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Search { ...props }/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(
      <Search { ...props }>Search</Search>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Button", () => {
  const props = {
    onClick: () => {},
    className: "string",
    children: "string"
  };

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Button { ...props }/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(
      <Button { ...props }>Click</Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("clicks and fires off event properly", () => {
    const mockCallBack = jest.fn();

    const button = shallow((
      <Button { ...props } onClick={mockCallBack}>Click</Button>
    ));
    button.find("button").simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});

  describe("Table", () => {
    const props = {
      list: [
        { title: "1", author: "1", num_comments: 1, points: 2, objectID: "a"},
        { title: "2", author: "2", num_comments: 1, points: 2, objectID: "b"},
      ],
      sortKey: "TITLE",
      isSortReverse: false,
      onDismiss: () => {}
    };

    it("shows two items in list", () => {
      const element = shallow(
        <Table { ...props }/>
      );
      expect(element.find(".table-row").length).toBe(2);
    });

    it("renders without crashing", () => {
      const div = document.createElement("div");
      ReactDOM.render(<Table { ...props }/>, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    test("has a valid snapshot", () => {
      const component = renderer.create(
        <Table { ...props }/>
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
