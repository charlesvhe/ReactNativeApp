import React, { Component } from 'react';
import {
  View
} from 'react-native';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from './reducers'

import NewsList from './components/NewsList'

const store = applyMiddleware(thunk)(createStore)(combineReducers(reducers));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View>
          <NewsList />
        </View>
      </Provider>
    );
  }
}
