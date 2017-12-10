import React, { Component } from 'react';
import axios from 'axios';

import InputBox from '../components/InputBox';
import Loader from '../components/Loader';

import './RandomPage.css';

const URL = 'http://api.giphy.com/v1/gifs/random';
const API_KEY = 'JokfEsQ6phaio2LlwNgGHhpBr47QE89e';

class RandomPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: null,
      query: ''
    };

    this.delay = 5000;

    this.loadGif = this.loadGif.bind(this);
    this.updateDelay = this.updateDelay.bind(this);
    this.updateInterval = this.updateInterval.bind(this);

    this.interval = setInterval(this.loadGif, this.delay);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  loadGif() {
    axios.get(URL, {
      params: { api_key: API_KEY }
    }).then(response => {
      this.setState({ result: response.data.data, loading: false });
    }).catch(error => {
      console.log(error);
    })
  }

  updateDelay(event) {
    event.preventDefault();

    this.delay = event.target.value;
  }

  updateInterval(event) {
    event.preventDefault();

    clearInterval(this.interval);
    this.interval = setInterval(this.loadGif, this.delay);
  }

  render() {
    return (
      <div className="random">

        {this.state.loading ? <Loader /> : ''}

        <InputBox clazz="delay" label="Delay" type="number"
          value={this.delay}
          onChange={this.updateDelay}
          button="Save" onButtonClick={this.updateInterval} />

        {this.state.result ?
          <div>
            <img src={this.state.result.image_url} alt={this.state.result.caption} />
          </div>
          : ''}

      </div>
    );
  }

}

export default RandomPage;
