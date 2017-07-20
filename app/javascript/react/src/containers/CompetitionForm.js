import React, { Component } from 'react';
import TextField from "../components/TextField"


class CompetitionForm extends Component{
  constructor(props){
  super(props)
  this.state = {
    length: "",
    wager_amount: "",
    competitor: ""
  }
  this.handleChange = this.handleChange.bind(this)
  this.handleFormSubmit = this.handleFormSubmit.bind(this)
  this.handleClearForm = this.handleClearForm.bind(this)
}

handleFormSubmit(event){
  event.preventDefault();
  let formPayload = {
    wager_amount: this.state.wager_amount,
    length: this.state.length
  }
  this.props.addCompetition(formPayload)
  this.handleClearForm(event);
}

handleClearForm(event){
  event.preventDefault();
  this.setState({
    length: "",
    wager_amount:""
  })
}

  handleChange(event){
    this.setState({[event.target.name]:event.target.value})
  }

  render(){

    return(
      <form className="form" onSubmit={this.handleFormSubmit}>
      <TextField
        content={this.state.length}
        label= "Length of Contest"
        name="length"
        handlerFunction={this.handleChange}
      />
      <TextField
        content={this.state.wager_amount}
        label= "Wager Amount ($)"
        name="wager_amount"
        handlerFunction={this.handleChange}
      />
      <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default CompetitionForm;
