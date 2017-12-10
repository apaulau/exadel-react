import React from 'react';
import PropTypes from 'prop-types';

import './LoadMore.css';

const LoadMore = props =>
  <button type="button" className="load-more" onClick={props.handler}>MORE!</button>;

LoadMore.propTypes = {
  handler: PropTypes.func.isRequired
}

export default LoadMore;
