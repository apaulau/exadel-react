import React from 'react';
import PropTypes from 'prop-types';

import './InputBox.css';

class InputBox extends React.Component {
  constructor(props) {
    super(props);

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(event) {
    this.props.onButtonClick(this.input.value);
  }

  render() {
    const {clazz, label, type = 'text', placeholder, value, onChange, button, onSubmit} = this.props;

    const input = (
      <div className={`${clazz} input-box`}>
        {label ? <label>{label}</label> : ''}

        <input type={type} placeholder={placeholder} defaultValue={value} onChange={onChange} ref={input => this.input = input} />

        {button ? <button type={onSubmit ? 'submit' : 'button'} onClick={this.handleButtonClick}>{button}</button> : ''}
      </div>
    )

    if (onSubmit) {
      return <form onSubmit={onSubmit}>{input}</form>
    } else {
      return input
    }
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
