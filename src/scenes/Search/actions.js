export const SEARCH = 'search/execute';
export const QUERY_CHANGE = 'search/query-change';
export const LOAD_MORE = 'search/load-more';

export const LOAD_SUCCESS = 'search/load-success';
export const LOAD_ERROR = 'search/load-error';

export const CHANGE_PAGE_SIZE = 'search/change-page-size';

export const queryChange = (query) => {
  return { type: QUERY_CHANGE, query };
};

export const search = () => {
  return { type: SEARCH }
};

export const loadMore = () => {
  return { type: LOAD_MORE };
};

export const loadSuccess = (payload) => {
  return { type: LOAD_SUCCESS, payload };
};

export const loadError = (error) => {
  return { type: LOAD_ERROR, error };
};

export const changePageSize = (pageSize) => {
  return { type: CHANGE_PAGE_SIZE, pageSize };
};
