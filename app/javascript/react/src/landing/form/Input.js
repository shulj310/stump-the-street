import React from 'react'


const Input = props =>{

  return(
    <div className="input-field col s12" style={{margin:"1vw 1vw"}}>
      <i id="icon" className="material-icons prefix">account_circle</i>
      <input
        id="icon_prefix"
        type="text"
        name={props.name} onChange={props.handleChange} value={props.content} />
      <label className="input-override" style={{paddingRight:"10vw",zIndex:-1}}>{props.label}</label>
    </div>
  )
}

export default Input
