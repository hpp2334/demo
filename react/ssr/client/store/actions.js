import { API_SERVER } from '../../server/config';

export const UPDATE_SEARCH_DATA = 'UPDATE_SEARCH_DATA';

/**
 * 
 * @param {object} params 
 * @param {string} params.query
 */
export const getSearchData = (params) => async (dispatch, getState) => {
  const rsp = await fetch(API_SERVER + '/api/search?query=' + params.query);
  const data = await rsp.json();
  await dispatch(updateSearchData({
    query: params.query,
    data,
  }));
}

/**
 * 
 * @param {string} query 
 * @param {object} data
 * @param {string | null} data.query
 * @param {Array<string> | null} data.data
 */
const updateSearchData = (data) => {
  return {
    type: UPDATE_SEARCH_DATA,
    search: data
  };
};

