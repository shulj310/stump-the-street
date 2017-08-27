import React from 'react'

const DateChanger = props =>{

  let options = [{30:'1 Mo'},{90:'3 Mo'},{180:'6 Mo'},{360:'1 Yr'},{720:'2 Yr'}]

  let showOptions = options.map((option,index)=>{

    let style={
      paddingBottom:0,
      paddingTop:0,
      margin:0
    }

    if (props.content == Object.keys(option)[0]){
      style={
        color:"#019499",
        fontSize:"105%",
        textDecoration:"underline",
        paddingBottom:0,
        paddingTop:0,
        margin:0
      }
    }

    return(
      <span style={{
        paddingBottom:0,
        paddingTop:0
        }}
        key={index} onClick={props.changeDate} id={Object.keys(option)[0]}>
        <button
          style={{
            borderRadius:"5px",
            background:"transparent",
            border:"transparent",
            paddingBottom:0,
            paddingTop:0
          }}
          id={Object.keys(option)[0]}>
          <p style={style}
            id={Object.keys(option)[0]}>
            {Object.values(option)[0]}
          </p>
        </button>
      </span>
    )
  })

  return(
    <div style={{
      paddingBottom:0,
      paddingTop:0
    }}>
      {showOptions}
    </div>
  )
}
export default DateChanger
