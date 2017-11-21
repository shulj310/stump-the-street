import React from 'react'
import {Col,Row,Icon,Button} from 'react-materialize'
import Input from "./Input"
import Checked from './Checked'

const Form = props =>{

  let success;
  let complete;
  if (props.submit){
    success = <p style={{fontSize:"100%", paddingLeft:"2vw",color:"#311B92"}}>
                  Success!
              </p>
  }
  if (props.complete){
    complete = <p style={{fontSize:"100%", paddingLeft:"2vw",color:"#311B92"}}>
                  Please complete entire form!
              </p>
  }

  return(
    <form method="post" action="/leads">
      <div style={{backgroundColor:"#311B92",maxWidth:"50vw"}}>
        <h1
          style={{fontSize:"4.5vw",paddingLeft:"4vw",paddingTop:"0.5vw",paddingRight:"1vw"}}>Join the Waitlist</h1>
      </div>
      <div style={{maxWidth:"90vw"}}>
        <p className="copy" style={{paddingTop:0,paddingBottom:0, paddingLeft:"4.5vw",color:"black"}}>Stay informed on the latest Stump news and get in line for the first, live event.</p>
      </div>
      <div style={{paddingLeft:"2vw",color:"#311B92"}}>
        <Row>
          <Col s={12} m={6}>
            <div
              style={{paddingRight:"2vw"}}>
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
                beta={props.beta}
                handleChange={props.handleBetaChange}
              />
            </div>
            <div className="clearfix center-align">
              <div style={{paddingTop:"3vw"}}>
                {success}
                {complete}
              </div>
              <div style={{paddingTop:"3vw"}}>
              <a className="waves-effect waves-light btn"
                onClick={props.handleSubmit}
                id="submit-button"
                style={{backgroundColor:"#E55425",height:"5vw",width:"15.7vw",fontSize:"2vw"}}>Submit</a>
              </div>
            </div>
          </Col>
          <Col s={12} m={6}>
          <img
            src={require(`./../../../../../assets/images/stump_homepage_graphic_cannon.png`)}
            style={{maxWidth:"100%",height:"auto",width:"auto"}}
          />
          </Col>
        </Row>
      </div>
    </form>
  )

}

export default Form
