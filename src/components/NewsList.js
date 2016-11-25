import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ListView,
  RefreshControl,
  ActivityIndicator,
  Text
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions/NewsList'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 })
const dataSource = ds.cloneWithRows(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])

class NewsList extends Component {
  render() {
    const { refreshing } = this.props;
    return (
      <View style={styles.container}>
        <ListView
          dataSource={dataSource}
          renderRow={this._renderRow.bind(this)}
          enableEmptySections={true}
          onEndReached={this._nextPage.bind(this)}
          onEndReachedThreshold={1}
          renderFooter={this._renderFooter.bind(this)}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor="#000"
              title="加载中..."
              titleColor="#000"
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor="#000"
              />}
          />
      </View>
    );
  }
  _renderRow(row) {
    console.log('_renderRow');
    return (
      <Text>{row}</Text>
    )
  }
  _onRefresh() {
    console.log('_onRefresh');
    const {pagging, size} = this.props;
    pagging(1, size);
  }
  _nextPage() {
    console.log('_nextPage');
    const {pagging, page, size, refreshing} = this.props;
    if (refreshing) {
      return
    }
    pagging(page + 1, size)
  }
  _renderFooter() {
    return (
      <ActivityIndicator animating={this.props.refreshing} size="large" />
    )
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

const styles = StyleSheet.create({
  container: {
    height: 150,
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#d7d9db',
    backgroundColor: '#fff'
  }
});