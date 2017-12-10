import React from 'react';

import './ImageGrid.css';

const Search = props =>
  <ul className="image-grid">
    {
      props.results.map(item => {
        return (
          <li key={item.id} className="image">
            <img src={item.images.preview_gif.url} alt={item.slug} />
          </li>
        );
      })
    }
  </ul>;

export default Search;
