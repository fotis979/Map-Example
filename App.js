import React, { Component } from "react";

import { Provider } from "react-redux";

import { Main } from "./src/screens";
import { createStore } from "./src/store";
const store = createStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
