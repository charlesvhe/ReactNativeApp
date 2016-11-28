export const MODULE_NAME = 'NewsList'

export const REFRESH = '${MODULE_NAME}/REFRESH'

export const PAGE_START = '${MODULE_NAME}/PAGE_START'
export const PAGE_END = '${MODULE_NAME}/PAGE_END'

export function pagging(dispatch, page, size) {
  console.log('pagging ' + page);
  dispatch({ type: PAGE_START });
  console.log(PAGE_START);

  fetch('https://api.998jk.cn/cms/article/pb/search'
    , {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        categoryId: 14,
        page: page,
        pageSize: size
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      dispatch({ type: PAGE_END, page: page, size: size, data: responseJson.data });
      console.log(PAGE_END);
    })
    .catch((error) => {
      console.error(error);
    });
}

export function refresh(size) {
  console.log('refresh');
  return (dispatch) => {
    dispatch({ type: REFRESH });
    pagging(dispatch, 1, size)
  }
};

export function next(page, size) {
  console.log('next');
  return (dispatch) => {
    pagging(dispatch, page + 1, size)
  }
};