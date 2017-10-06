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
      name:""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }

  handleChange(event){
    this.setState({[event.target.name]:event.target.value})
  }

  handleClear(event){
    this.setState({
      email:"",
      name:""
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
            name={this.state.name}
            email={this.state.email}
            handleChange={this.handleChange}/>
        </div>
      </div>
    )
  }

}

export default Landing
