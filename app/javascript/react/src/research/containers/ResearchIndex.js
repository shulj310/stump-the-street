import React, { Component } from 'react'
import TextField from '../../components/TextField'

class ResearchIndex extends Component{
  constructor(props){
  super(props)
    this.state = {
      ticker:""
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    this.setState({[event.target.name]:event.target.value})
  }

  render(){



    return(
      <div>
      <h3>
        Stock Screener
      </h3>

      <TextField
        content={this.state.ticker}
        label= "Enter Ticker"
        name="ticker"
        handlerFunction={this.handleChange}
      />

      </div>


    )
  }
}

export default ResearchIndex
