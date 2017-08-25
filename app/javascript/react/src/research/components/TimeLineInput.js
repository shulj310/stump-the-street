import React from 'react'
import { Input } from 'react-materialize'


const TimeLineInput = props =>{

  let dateOptions = props.options.map((option,index)=>{
    <option value={option} key={index}>{option}</option>
  })


  return(
    <Input s={3} name={"date"} type='select' defaultValue={props.content}
      onChange={props.handlerFunction}>
        {dateOptions}
    </Input>
  )
}

export default TimeLineInput
