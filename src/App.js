import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import RandomPage from "./pages/RandomPage";

import Header from './components/Header';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
          <Header/>

					<div className="row">
						<Route path="/search" component={SearchPage}></Route>
						<Route path="/random" component={RandomPage}></Route>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
