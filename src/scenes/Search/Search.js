import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';

import * as actions from "./actions";

import InputBox from '../../components/InputBox';
import ImageGrid from '../../components/ImageGrid';
import LoadMore from '../../components/LoadMore';
import Loader from '../../components/Loader';

import './Search.css';

class Search extends Component {

  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
  }

  handleSearch(event) {
    event.preventDefault();

    this.props.onSearch();
  }

  handleQueryChange(event) {
    this.props.onQueryChange(event.target.value);
  }

  handlePageSizeChange(event) {
    this.props.onPageSizeChange(event.target.value);
  }

  render() {
    return (
      <Fragment>
        {this.props.loading ? <Loader /> : ''}

        <InputBox clazz="limit" label="Limit" type="number" placeholder="specify limit"
          value={this.props.pageSize}
          onChange={this.handlePageSizeChange} />

        <InputBox clazz="search" type="text" placeholder="what gif are you looking for?" button="Find"
          value={this.props.query}
          onChange={this.handleQueryChange}
          onSubmit={this.handleSearch} />

        <ImageGrid items={this.props.items} />

        {this.props.totalItems ? <LoadMore handler={this.props.onLoadMore} /> : ''}
      </Fragment>
    );
  }

}

const mapStateToProps = state => {
  const searchState = state.search;
  return {
    query: searchState.tempQuery,
    items: searchState.items,
    totalItems: searchState.totalItems,
    pageSize: searchState.pageSize,
    loading: searchState.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadMore: () => {
      dispatch(actions.loadMore())
    },
    onSearch: () => {
      dispatch(actions.search())
    },
    onPageSizeChange: (pageSize) => {
      dispatch(actions.changePageSize(pageSize));
    },
    onQueryChange: (query) => {
      dispatch(actions.queryChange(query))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Search)
