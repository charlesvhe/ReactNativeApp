import { ListView } from 'react-native';
import { PAGE_START, PAGE_END } from '../actions/NewsList'

let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 })
let defaultDataSource = ds.cloneWithRows([])

export default function newsList(state = { data: [], dataSource: defaultDataSource, page: 0, size: 10, refreshing: false }, action) {
  switch (action.type) {
    case PAGE_START:
      return {
        ...state,
        refreshing: true
      };

    case PAGE_END:
      let dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      let data = state.data.concat(action.data);
      dataSource = dataSource.cloneWithRows(data);
      return {
        ...state,
        refreshing: false,
        data: data,
        dataSource: dataSource
      };

    default:
      return state;
  }
}