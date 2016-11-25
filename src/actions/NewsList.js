export const MODULE_NAME = 'NewsList'

export const PAGE_START = `${MODULE_NAME}/PAGE_START`
export const PAGE_END = `${MODULE_NAME}/PAGE_END`

export function pagging(page, size) {
  return (dispatch) => {
    dispatch({ type: PAGE_START });
    console.log(PAGE_START);

    fetch('http://api.998jk.cn:8080/cms/article/pb/search'
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
        dispatch({ type: PAGE_END, data: responseJson.data });
        console.log(PAGE_END);
      })
      .catch((error) => {
        console.error(error);
      });
  };
} 