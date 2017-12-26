import React from 'react';
import PropTypes from 'prop-types';

import './ImageGrid.css';

const ImageGrid = props =>
  <ul className="image-grid">
    {
      props.items.map(item => {
        return (
          <li key={item.id} className="image">
            <img src={item.images.preview_gif.url} alt={item.slug} />
          </li>
        );
      })
    }
  </ul>;

ImageGrid.propTypes = {
  items: PropTypes.array.isRequired
}

export default ImageGrid;
