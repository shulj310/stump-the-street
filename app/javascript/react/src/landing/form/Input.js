import React from 'react'


const Input = props =>{

  return(
      <label>
        {props.text}
        <input type="text" name="name" />
      </label>
  )
}

export default Input
