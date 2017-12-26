import React, { Component } from 'react';
import './App.css';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import Header from './components/Header';

import Search, { searchReducer, searchEpic } from "./scenes/Search";
import Random, { randomReducer, randomEpic } from "./scenes/Random";

import giphyApi from './services/api/giphy';

// configuring router and router middleware
const history = createHistory();
const routerHistoryMiddleware = routerMiddleware(history);

// configuring epics (side effects and middleware)
const rootEpic = combineEpics(searchEpic, randomEpic);

const epicMiddleware = createEpicMiddleware(rootEpic, {
  dependencies: {
      giphyApi
  }
});

// needed to setup redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// creating the store
const store = createStore(
  combineReducers({
    router: routerReducer,
    search: searchReducer,
    random: randomReducer
  }),
  composeEnhancers(applyMiddleware(routerHistoryMiddleware, epicMiddleware))
);


class App extends Component {
  render() {
    return (
        <div className="App">
          <Provider store={store}>
              <ConnectedRouter history={history}>

                <div>
                  <Header />

                  <div className="row">
                    <Route exact path="/" component={Search}/>
                    <Route exact path="/random" component={Random}/>

                  </div>
                </div>

              </ConnectedRouter>
          </Provider>
        </div>
    );
  }
}

export default App;
