import React from 'react'
import {Col,Card,Row,Icon} from 'react-materialize'

const WinnerCard = props =>{
  return(
    <Row>
      <Col s={6}>
      </Col>
      <Col s={5}>
        <Card
          style={{borderRadius:"30px",maxHeight:120,
          background: "repeating-linear-gradient( 135deg, #d3d6ed, #daddef 10px, #e3e5f2 10px, #c5c9e0 20px)"}}>
          <Row>
            <Col s={5}>
              <img
              src={props.src}
              alt='Contact Person'
              style={{borderRadius:"50%",boxShadow:"0px 0px 5px #888888"}}
              width={"110%"}
              height={"110%"}
               />
               <label style={{fontSize:"90%",color:"black"}}>
               {props.name}</label>
            </Col>
            <Col s={1}>
            </Col>
            <Col s={6}>
              <label style={{fontSize:"100%",color:"black"}}>
                <strong>{props.label}</strong>
              </label>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default WinnerCard
