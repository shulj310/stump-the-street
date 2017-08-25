import React from 'react'
import { Input, Row } from 'react-materialize'

const RelativeChanger = props =>{

  let options = ['Absolute','Relative'].map((label,index)=>{

    let checked=props.content

    if (label == "Absolute"){
      checked=!props.content
    }

    return(
      <Input
        name={label}
        type="radio"
        value={label}
        key={index}
        label={label}
        checked={checked}
        onChange={props.changeRelative}
      />
    )

  })

  return(
      <span>
        {options}
      </span>
  )
}
export default RelativeChanger
