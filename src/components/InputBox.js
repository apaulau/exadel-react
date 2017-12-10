import React from 'react';

import './InputBox.css';

const InputBox = ({clazz, label, type, placeholder, value, onChange, button, onSubmit, onButtonClick}) => {

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


export default InputBox;
