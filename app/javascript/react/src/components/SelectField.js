import React from 'react';
import { Row, Input, Button, Icon } from 'react-materialize'

const SelectField = (props) =>{
  let selectorOptions = props.options.map( (option, index) => {
    return (
        <option key={index} value={Object.keys(option)[0]}>{Object.values(option)[0]}</option>
    )
  })

  return(
    <Row>
      <Input s={12} name={props.name} type='select' label={props.label} defaultValue={props.content}
        onChange={props.handlerFunction}>
        {selectorOptions}
      </Input>
    </Row>
  )
}

export default SelectField
