import React, {Component} from 'react'
import Nav from './nav/Nav'
import Form from './form/Form'
import Tag from './Tag'
import HowToPlay from './HowToPlay'

class Landing extends Component{
  constructor(props){
    super(props)
    this.state ={

    }

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
          <Form />
        </div>
      </div>
    )
  }

}

export default Landing
