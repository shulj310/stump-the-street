import React from 'react'
import { Col,Row } from 'react-materialize'

const Clickable = props =>{

  let tag = props.tag
  let showTag = props.tag.replace(/\s+/g, '')

  if (showTag.length >= 9){
    showTag = showTag.substring(0,8)+".."
  }

  return(
    <div
      key={props.index}
      style={{padding:0,margin:"2px",display:"inline-block",borderRadius:"25px",backgroundColor:"#FAFAFA",zIndex:100,maxHeight:"30px",maxWidth:"130px",boxShadow:"1px 1px 1px #888888"}}
      >
      <Row>
        <Col s={1}>
          <button style={{padding:"0px",margin:"0px",borderRadius:"25px",background:"transparent",
            border:"transparent",position:"relative",top:5,left:3,color:"#37474F"}}>
              <i className="material-icons"
                style={{fontSize:"100%"}}
                id={tag}
                onClick={props.removeField}>clear</i>
            </button>
        </Col>
        <Col s={8}>
          <label style={{fontSize:"75%",position:"relative",top:3,color:"#37474F"}}>
            {showTag}
          </label>
        </Col>
      </Row>
    </div>

  )
}

export default Clickable
