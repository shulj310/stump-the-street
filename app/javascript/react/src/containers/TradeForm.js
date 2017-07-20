import React, { Component } from 'react';
import TextField from '../components/TextField'

class TradeForm extends Component{
  constructor(props){
  super(props)
  this.state = {
    ticker: "",
    share_amount: ""
  }
  this.handleChange = this.handleChange.bind(this)
  this.handleFormSubmit = this.handleFormSubmit.bind(this)
  this.handleClearForm = this.handleClearForm.bind(this)
}

handleFormSubmit(event){
  event.preventDefault();
  let formPayload = {
    ticker: this.state.ticker,
    share_amount: this.state.share_amount
  }
  this.props.addCompetition(formPayload)
  this.handleClearForm(event);
}

handleClearForm(event){
  event.preventDefault();
  this.setState({
    share_amount: "",
    ticker:""
  })
}

  handleChange(event){
    this.setState({[event.target.name]:event.target.value})
  }

  render(){

    return(
      <form className="form" onSubmit={this.handleFormSubmit}>
      <TextField
        content={this.state.share_amount}
        label= "Share Amount"
        name="share_amount"
        handlerFunction={this.handleChange}
      />
      <TextField
        content={this.state.ticker}
        label= "Ticker"
        name="ticker"
        handlerFunction={this.handleChange}
      />
      <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default TradeForm;
