import React, { Component } from 'react';
import {
  View, Text
} from 'react-native';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from './reducers'

import Counter from './components/Counter'

const store = applyMiddleware(thunk)(createStore)(combineReducers(reducers));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View>
          <Counter />
        </View>
      </Provider>
    );
  }
}
