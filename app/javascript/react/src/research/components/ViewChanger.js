import React from 'react'
import { Input } from 'react-materialize'

const ViewChanger = props =>{

  let options = ["1","2","3"].map((val)=>{

    let checked = (val==props.content)

    return(
      <div style={{position:"relative",display:"inline-block"}}
        key={val}>
        <Input
          name="show"
          value={val}
          key={val}
          checked={checked}
          onChange={props.handleChange}
          type="radio"
        />
      </div>
    )
  })

  return(
    <div>
      {options}
    </div>
  )
}

export default ViewChanger
