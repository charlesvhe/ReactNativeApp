export const MODULE_NAME = 'NewsDetail'

export const DETAIL_START = '${MODULE_NAME}/DETAIL_START'
export const DETAIL_END = '${MODULE_NAME}/DETAIL_END'

export function detail(newsId) {
  return (dispatch) => {
    console.log('detail ' +newsId);
    dispatch({ type: DETAIL_START });
    console.log(DETAIL_START);

    fetch('https://api.998jk.cn/cms/article/pb/'+newsId
      , {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch({ type: DETAIL_END, newsId: newsId, data: responseJson.data });
        console.log(DETAIL_END);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
