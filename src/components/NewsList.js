import React, { Component } from 'react'
import { View, ListView, Image, Text, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../actions/NewsList'

import NewsDetail from './NewsDetail'

class NewsList extends Component {
  componentDidMount() {
    this.props.pagging(1, this.props.size);
  }
  render() {
    const { refreshing, dataSource } = this.props;
    return (
      <View>
        <TouchableOpacity onPress={this._onDetail.bind(this, 914)}>
          <Text>next</Text>
        </TouchableOpacity>
        <ListView style={{ minHeight: 100 }}
          dataSource={dataSource}
          renderRow={this._renderRow.bind(this)}
          enableEmptySections={true}
          onEndReached={this._onEndReached.bind(this)}
          onEndReachedThreshold={1}
          renderFooter={this._renderFooter.bind(this)}
          refreshControl={
            <RefreshControl refreshing={refreshing}
              onRefresh={this._onRefresh.bind(this)} />}
          />
      </View>
    );
  }
  _renderRow(row) {
    return (
      <TouchableOpacity onPress={this._onDetail.bind(this, row.id)}>
        <Image source={{ uri: row.titleImg }} style={{ width: 120, height: 120 }} />
        <Text>{row.title}</Text>
      </TouchableOpacity>
    );
  }
  _renderFooter() {
    return (
      <ActivityIndicator animating={this.props.refreshing} size="large" />
    );
  }
  _onRefresh() {
    console.log('_onRefresh');
    if (!this.props.refreshing) {
      this.props.pagging(1, this.props.size);
    }
  }
  _onEndReached() {
    console.log('_onEndReached');
    if (!this.props.refreshing) {
      this.props.pagging(this.props.page + 1, this.props.size);
    }
  }
  _onDetail(newsId) {
    console.log('_onDetail ' + newsId);
    if (this.props.navigator) {
      this.props.navigator.push({
        scene: NewsDetail,
        params: { newsId: newsId }
      })
    }
  }
}


export default connect(
  state => ({
    ...state.newsList  // 自动展开state.newsList(reducer方法名)下所有属性
  }), 
dispatch => ({
    ...bindActionCreators(actions, dispatch)  // 自动展开actions下所有方法
})
)(NewsList);
