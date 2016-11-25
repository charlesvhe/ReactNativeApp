import { PAGE_START, PAGE_END } from '../actions/NewsList'

// let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 })
// let defaultDataSource = ds.cloneWithRows([])

export default function newsList(state = { page: 0, size: 10, refreshing: false }, action) {
  switch (action.type) {
    case PAGE_START:
      return {
        ...state,
        refreshing: true
      };

    case PAGE_END:
      return {
        ...state,
        refreshing: false,
        data: action.data
      };

    default:
      return state;
    }
}