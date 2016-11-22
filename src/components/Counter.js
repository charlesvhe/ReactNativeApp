import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions/Counter'

class Counter extends Component {
  render() {
    const { count, increment, decrement } = this.props;
    return (
      <View>
        <Text>AppContainer{count}!</Text>
        <TouchableOpacity onPress={increment}>
          <Text>up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={decrement}>
          <Text>down</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


export default connect(
    state=>({
      ...state.counter  // 自动展开state.counter(reducer方法名)下所有属性
    }), 
    dispatch=>({
      ...bindActionCreators(actions, dispatch)  // 自动展开actions下所有方法
    })
)(Counter);