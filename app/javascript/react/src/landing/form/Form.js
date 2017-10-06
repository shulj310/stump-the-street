import React from 'react'
import {Col,Row,Icon,Button} from 'react-materialize'
import Input from "./Input"
import Checked from './Checked'

const Form = props =>{

  return(
    <div>
      <div style={{backgroundColor:"#311B92",maxWidth:"30vw"}}>
        <h1
          style={{fontSize:"3vw",paddingLeft:"4vw",paddingTop:"0.5vw",paddingRight:"1vw"}}>Join the Waitlist</h1>
      </div>
      <div>
        <p style={{fontSize:"2vw",paddingTop:0,paddingBottom:0, paddingLeft:"1.75vw",color:"black"}}>Stay informed on the latest Stump news and get in line for the first, live event.</p>
      </div>
      <div style={{fontSize:"3vw", paddingLeft:"2vw",color:"#311B92"}}>
        <Row>
          <Col s={6}>
            <div style={{fontSize:"2vw"}}>
            	<Input
                label="Name"
                name="name"
                content={props.name}
                handleChange={props.handleChange}
              />
              <Input
                label="Email"
                name="email"
                content={props.email}
                handleChange={props.handleChange}
              />
              <Checked

              />

            </div>
          </Col>
          <Col s={6}>
          <img
            src={require(`./../../../../../assets/images/stump_homepage_graphic_cannon.png`)}
            style={{maxWidth:"100%",height:"auto",width:"auto"}}
          />
          </Col>
        </Row>
        <Row>
        <a className="waves-effect waves-light btn"
          style={{backgroundColor:"#311B92",height:"5vw",width:"15.7vw",fontSize:"2vw"}}>Submit</a>
        </Row>
      </div>
    </div>
  )

}

export default Form
