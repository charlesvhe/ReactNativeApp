import { ListView } from 'react-native'
import { REFRESH, PAGE_START, PAGE_END } from '../actions/NewsList'

let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 })
let defaultDataSource = ds.cloneWithRows([])

export default function newsList(state = { data: [], dataSource: defaultDataSource, page: 0, size: 10, refreshing: false }, action) {
  switch (action.type) {
    case PAGE_START:
      if (action.page == 1) { // first page, refresh
        return {
          ...state,
          page: action.page,
          size: action.size,
          refreshing: true,
          data: [],
          dataSource: defaultDataSource
        };
      }
      return {
        ...state,
        refreshing: true
      };

    case PAGE_END:
      if (action.data.length > 0) {
        let dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        let data = state.data.concat(action.data);
        dataSource = dataSource.cloneWithRows(data);
        return {
        ...state,
          page: action.page,
          size: action.size,
          refreshing: false,
          data: data,
          dataSource: dataSource
        };
      } else {  // no data return
        return {
        ...state,
          refreshing: false
        };
      }

    default:
      return state;
  }
}