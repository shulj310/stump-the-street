import React, { Component } from 'react'

class CreditForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      creditNumber:"",
      name:"",
      zipCode:"",
      expirationDate:"",
      couponCode:""
    }

    this.handleCreditImport = this.handleCreditImport.bind(this)
    this.clearForm = this.clearForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleCreditImport(event){
    event.preventDefault();

    let formPayload = {
      creditNumber:this.state.creditNumber,
      name:this.state.name
      zipCode:this.state.zipCode
      expirationDate:this.state.expirationDate
      couponCode:this.state.couponCode
    }
    this.props.addToWallet(formPayload)
    this.clearForm(event);
  }

  clearForm(event){
    event.preventDefault();
    this.setState({
      creditNumber:"",
      name:"",
      zipCode:"",
      expirationDate:"",
      couponCode:""
    })
  }

  handleChange(event){
    this.setState({[event.target.name]:event.target.value})
  }

  componentDidMount(){

  }
  render(){

    return(
      <h1>Hello from CC Form</h1>
    )
  }
}

export default CreditForm
