import React from 'react'
import {Input} from 'react-materialize'

const Checked = props =>{
  let checked=""
  if (props.beta){
    checked="checked"
  }

  return(
      <div className="input-field col s12" style={{padding:0, margin:"0 1vw"}}>
      <p>
        <input
          onClick={props.handleChange}
          style={{fontSize:"1.5vw",paddingRight:"1vw"}} type="checkbox" id="test6" checked={checked}/>
        <label style={{fontSize:"1.5vw",paddingLeftt:"1vw"}} htmlFor="test6">Consider me for Beta Testing</label>
      </p>
    </div>
  )
}

export default Checked
