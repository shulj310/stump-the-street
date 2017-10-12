import React from 'react'


const Input = props =>{

  return(
    <div className="input-field col s12" style={{margin:"1vw 1vw"}}>
      <i className="material-icons prefix" style={{fontSize:"3vw",maxWidth:"20px"}}>account_circle</i>
      <input
        id="icon_prefix"
        type="text"
        style={{marginLeft:"3vw",marginBottom:"2vw"}}
        name={props.name} onChange={props.handleChange} value={props.content} />
      <label style={{fontSize:"1.5vw",paddingRight:"1vw",zIndex:-1}}>{props.label}</label>
    </div>
  )
}

export default Input
