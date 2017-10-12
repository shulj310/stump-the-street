import React from 'react'
import {Col,Row,Icon,Button} from 'react-materialize'
import Input from "./Input"
import Checked from './Checked'

const Form = props =>{

  let success;
  if (props.submit){
    success = <p style={{fontSize:"1vw", paddingLeft:"2vw",color:"#311B92"}}>
                  Success!
              </p>
  }

  return(
    <form method="post" action="/leads">
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
                content={props.beta}
                handleChange={props.handleBetaChange}
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
        <div style={{paddingTop:"3vw",paddingLeft:"10vw"}}>
        {success}
        <a className="waves-effect waves-light btn"
          onClick={props.handleSubmit}
          style={{backgroundColor:"#311B92",height:"5vw",width:"15.7vw",fontSize:"2vw"}}>Submit</a>
        </div>
      </div>
    </form>
  )

}

export default Form
