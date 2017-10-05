import React from 'react'
import {Col,Row,Input,Icon,Button} from 'react-materialize'

const Form = props =>{

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
        	<Input s={12} label="Name" name="lead[name]" validate><Icon>account_circle</Icon></Input>
        	<Input s={12} label="Email" name="lead[email]" validate type='email'><Icon>email</Icon></Input>
          <Input name='lead[beta]' type='checkbox' value='beta' label='Consider me for Beta Testing' defaultValue='checked' />
          </Col>
          <Col s={6}>
          <img
            src={require(`./../../../../../assets/images/stump_homepage_graphic_cannon.png`)}
            style={{maxWidth:"100%",height:"auto",width:"auto"}}
          />
          </Col>
        </Row>
        <Row>
          <Button style={{backgroundColor:"#311B92"}} waves='light' type="submit">Submit</Button>
        </Row>
      </div>
    </form>
  )

}

export default Form
