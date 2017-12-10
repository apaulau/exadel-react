import React from 'react';
import PropTypes from 'prop-types';

import './InputBox.css';

const InputBox = ({clazz, label, type = 'text', placeholder, value, onChange, button, onSubmit, onButtonClick}) => {
  const input = (
    <div className={`${clazz} input-box`}>
      {label ? <label>{label}</label> : ''}
      <input type={type} placeholder={placeholder} defaultValue={value} onChange={onChange} />
      {button ? <button type={onSubmit ? 'submit' : 'button'} onClick={onButtonClick}>{button}</button> : ''}
    </div>
  )

  if (onSubmit) {
    return <form onSubmit={onSubmit}>{input}</form>
  } else {
    return input
  }
}

InputBox.propTypes = {
  clazz: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  button: PropTypes.string,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onButtonClick: PropTypes.func
};

export default InputBox;
