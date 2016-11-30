import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../actions/NewsDetail'

class NewsDetail extends Component {
  componentDidMount() {
    this.props.detail(this.props.newsId);
  }
  render() {
    return (
      <View>
        <Text>{this.props.title}</Text>
        <Image source={{ uri: this.props.titleImg }} style={{ width: 120, height: 120 }} />
        <Text>{this.props.content}</Text>
      </View>
    );
  }
}


export default connect(
  state => ({
    ...state.newsDetail  // 自动展开state.newsDetail(reducer方法名)下所有属性
  }), 
dispatch => ({
    ...bindActionCreators(actions, dispatch)  // 自动展开actions下所有方法
})
)(NewsDetail);
