import { DETAIL_START, DETAIL_END } from '../actions/NewsDetail'

export default function newsDetail(state = {}, action) {
  switch (action.type) {
    case DETAIL_START:
      return state;

    case DETAIL_END:
      if (action.data.length > 0) {
        return {
          ...state,
          ...action.data[0]
        };
      } else {  // no data return
        return state;
      }

    default:
      return state;
  }
}
