export const LOAD_RANDOM = 'random/load-random';
export const LOAD_SUCCESS = 'random/load-success';
export const LOAD_ERROR = 'random/load-error';

export const START_TIMER = 'random/start-timer';
export const STOP_TIMER = 'random/stop-timer';
export const CHANGE_INTERVAL = 'random/change-interval';


export const loadRandom = () => ({ type: LOAD_RANDOM });
export const loadSuccess = item => ({ type: LOAD_SUCCESS, item });
export const loadError = error => ({ type: LOAD_ERROR, error });
export const startTimer = () => ({ type: START_TIMER });
export const stopTimer = () => ({ type: STOP_TIMER });
export const changeInterval = interval => ({ type: CHANGE_INTERVAL, interval });
