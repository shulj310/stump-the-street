import React from 'react'
import {Input} from 'react-materialize'

const Checked = props =>{

  return(
      <div className="input-field col s12" style={{padding:0, margin:0}}>
      <p>
        <input style={{fontSize:"1.5vw",paddingRight:"1vw"}} type="checkbox" id="test6"/>
        <label style={{fontSize:"1.5vw",paddingLeftt:"1vw"}} htmlFor="test6">Consider me for Beta Testing</label>
      </p>
    </div>
  )
}

export default Checked
