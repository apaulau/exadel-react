import React from 'react';

import './LoadMore.css';

const Search = props =>
  <button type="button" className="load-more" onClick={props.handler}>MORE!</button>;

export default Search;
