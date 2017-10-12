import React, {Component} from 'react'
import Nav from './nav/Nav'
import Form from './form/Form'
import Tag from './Tag'
import HowToPlay from './HowToPlay'

class Landing extends Component{
  constructor(props){
    super(props)
    this.state ={
      email:"",
      name:"",
      beta:false,
      submit:false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleBetaChange = this.handleBetaChange.bind(this)
  }

  handleChange(event){
    this.setState({[event.target.name]:event.target.value})
  }

  handleSubmit(event){
    event.preventDefault()
    let formPayload = {
      email:this.state.email,
      name:this.state.name,
      beta:this.state.beta
    }
    fetch('/api/v1/leads', {
      method: "POST",
      body: JSON.stringify(formPayload),
      credentials: 'same-origin'
    }).then(response =>{
      let body = response.json()
      return body
    }).then(body=>{
      if (body["auth"] == "dup"){
        alert('This email address has already entereted!')
      }
      else{
        this.setState({submit:true})
      }
    })
    this.handleClear()
  }

  handleBetaChange(event){
    this.setState({beta:!this.state.beta})
  }

  handleClear(event){
    this.setState({
      email:"",
      name:"",
      beta:false
    })
  }
  render(){

    return(
      <div>
        <div
          style={{
            backgroundColor:"#311B92",
            padding:"3% 6%",
            height:"37vw"}}>
          <Nav />
          <Tag />
        </div>
        <div style={{position:"relative"}}>
          <div style={{position:"absolute",marginTop:"-2%"}}>
            <img
              src={require(`./../../../../assets/images/stump_dots_orange_8_stack.png`)}
              height={"99.9%"}
              width={"99.9%"}
            />
          </div>
        </div>
        <div style={{paddingTop:"1vw"}}>
          <HowToPlay />
          <Form
            submit={this.state.submit}
            name={this.state.name}
            email={this.state.email}
            beta={this.state.beta}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleBetaChange={this.handleBetaChange}/>
        </div>
      </div>
    )
  }

}

export default Landing
