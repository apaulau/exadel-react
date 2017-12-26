import { combineEpics } from 'redux-observable';
import giphyApi from '../../services/api/giphy';
import { Observable } from 'rxjs';

import * as actions from './actions';

const load = (action$, store) =>
  action$.ofType(actions.SEARCH, actions.LOAD_MORE)
    .concatMap(action => {
      const searchState = store.getState().search;
      const clearItems = action.type === actions.SEARCH;
      const params = {
        q: searchState.query,
        limit: searchState.pageSize,
        offset: clearItems ? 0 : searchState.items.length
      };

      return giphyApi.loadByQuery(params)
        .map(response => {
          return actions.loadSuccess(
            {
              items: response.data,
              totalItems: response.pagination.total_count,
              clearItems
            }
          );
        }).catch(error => {
          return Observable.of(actions.loadError(error.message));
        });
    });


export default combineEpics(load);
