
import { combineEpics } from 'redux-observable';
import giphyApi from '../../services/api/giphy';

import * as actions from './actions';
import { Observable } from "rxjs";

const loadRandomEpic = action$ =>
  action$.ofType(actions.LOAD_RANDOM)
    .switchMap(action => {
      return giphyApi.loadRandom()
        .map(item => actions.loadSuccess(item))
        .catch(error => Observable.of(actions.loadError(error.message)));
    });

export const changeIntervalEpic = (action$, store, { giphyApi }) =>
  action$.ofType(actions.CHANGE_INTERVAL)
    .switchMap(action => {
      let nextAction = { type: 'unknown' };

      if (store.getState().random.timerStarted) {
        nextAction = actions.startTimer();
      }

      return Observable.of(nextAction);
    });

export const timerEpic = (action$, store, { giphyApi }) =>
  action$.ofType(actions.START_TIMER)
    .switchMap(action => {
      const interval = store.getState().random.interval * 1000;

      return Observable.interval(interval)
        .mapTo(actions.loadRandom())
        .takeUntil(action$.ofType(actions.STOP_TIMER));
    });

export default combineEpics(loadRandomEpic, timerEpic, changeIntervalEpic);
