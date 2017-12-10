import React, { Component } from 'react';
import axios from 'axios';

import Loader from '../components/Loader';

const URL = 'http://api.giphy.com/v1/gifs/search';
const API_KEY = 'JokfEsQ6phaio2LlwNgGHhpBr47QE89e';

/**
 * axios documentation and examples at https://github.com/axios/axios
 */

class SearchPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      results: [],
      query: '',
      limit: 15
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  handleSearch(event) {
    event && event.preventDefault();

    this.setState({ loading: true });

    const { query, limit } = this.state;

    axios.get(URL, {
      params: { api_key: API_KEY, q: query, limit }
    }).then(response => {
      this.setState({ results: response.data.data, loading: false });
    }).catch(error => {
      console.log(error);
    })
  }

  handleQueryChange(event) {
    this.setState({ query: event.target.value });
  }

  handleLimitChange(event) {
    this.setState({ limit: event.target.value });
    this.handleSearch();
  }

  loadMore(event) {
    event.preventDefault();

    const { query, results, limit } = this.state;

    this.setState({ loading: true });

    axios.get(URL, {
      params: { api_key: API_KEY, q: query, offset: results.length, limit }
    }).then(response => {
      this.setState({ results: results.concat(response.data.data), loading: false });
    }).catch(error => {
      console.log(error);
    })
  }

  render() {
    return (
      <div>

        {this.state.loading ? <Loader /> : ''}

        <form onSubmit={this.handleSearch}>
          <div className="search">
            <input type="text" placeholder="what gif are you searching for?"
              value={this.state.query}
              onChange={this.handleQueryChange} />
            <button type="button" onClick={this.handleSearch}>Find!</button>
          </div>
        </form>

        <div className="limit">
          <label>Limit</label>
          <input type="number" placeholder="limit" value={this.state.limit} onChange={this.handleLimitChange} />
        </div>

        {
          this.state.results.length ?
            <ul className="image-grid">
              {
                this.state.results.map(item => {
                  return (
                    <li key={item.id} className="image">
                      <img src={item.images.preview_gif.url} alt={item.slug} />
                    </li>
                  );
                })
              }
            </ul> : ''
        }

        {this.state.results.length ? <button type="button" className="load-more" onClick={this.loadMore}>MOOOORE!</button> : ''}
      </div>
    );
  }

}

export default SearchPage;
