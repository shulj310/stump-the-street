import React, { Component } from 'react'
import TextField from '../components/TextField'
import { Row, Col } from 'react-materialize'

class CreditForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      couponCode:"",
    }

    this.handleCreditImport = this.handleCreditImport.bind(this)
    this.clearForm = this.clearForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleCreditImport(event){
    event.preventDefault();

    let formPayload = {
      couponCode:this.state.couponCode,
      dollarAdded:this.state.dollarAdded
    }
    this.props.addToWallet(formPayload)
    this.clearForm(event);
  }

  clearForm(event){
    event.preventDefault();
    this.setState({
      couponCode:"",
    })
  }

  handleChange(event){
    this.setState({[event.target.name]:event.target.value})
  }

  componentDidMount(){

  }
  render(){

    return(
    <div>
    <Row>
      <Col s={4}>
      <label style={{fontSize:"120%"}}>Credit Card functionality coming soon.
      For now, please use authorized Coupon Code to
      receive $100 on us!</label>
      </Col>
      <Col s={1}>
      </Col>
      <Col s={7}>
        <TextField
          content={this.state.couponCode}
          label= "Coupon Code"
          name="couponCode"
          handlerFunction={this.handleChange}
        />
        <a
          className="waves-effect waves-light btn btn-small"
          onClick={this.handleCreditImport}>
          Checkout
        </a>
      </Col>
    </Row>

    </div>
    )
  }
}

export default CreditForm
