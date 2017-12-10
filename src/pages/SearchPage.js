import React, { Component, Fragment } from 'react';
import axios from 'axios';

import './SearchPage.css';

import InputBox from '../components/InputBox';
import ImageGrid from '../components/ImageGrid';
import LoadMore from '../components/LoadMore';
import Loader from '../components/Loader';

const URL = 'http://api.giphy.com/v1/gifs/search';
const API_KEY = 'JokfEsQ6phaio2LlwNgGHhpBr47QE89e';
const DEFAULT_LIMIT = 15;

class SearchPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      results: [],
      query: '',
      limit: DEFAULT_LIMIT
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
    });
  }

  handleQueryChange(event) {
    this.setState({ query: event.target.value });
  }

  handleLimitChange(event) {
    const limit = Number(event.target.value);
    this.setState({ limit });

    if (limit) {
      setTimeout(this.handleSearch, 0);
    }
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
      <Fragment>
        {this.state.loading ? <Loader /> : ''}

        <InputBox clazz="limit" label="Limit" type="number" placeholder="specify limit"
          value={this.state.limit}
          onChange={this.handleLimitChange}/>

        <InputBox clazz="search" type="text" placeholder="what gif are you looking for?" button="Find"
          value={this.state.query}
          onChange={this.handleQueryChange}
          onSubmit={this.handleSearch}/>

        <ImageGrid results={this.state.results} />

        {this.state.results.length ? <LoadMore handler={this.loadMore} /> : ''}
      </Fragment>
    );
  }

}

export default SearchPage;
