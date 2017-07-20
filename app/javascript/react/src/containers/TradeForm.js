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
  this.handleBuySubmit = this.handleBuySubmit.bind(this)
  this.handleSellSubmit = this.handleSellSubmit.bind(this)
  this.handleClearForm = this.handleClearForm.bind(this)
}

handleBuySubmit(event){
  event.preventDefault();
  let formPayload = {
    ticker: this.state.ticker,
    share_amount: this.state.share_amount
  }
  this.props.makeTrade(formPayload)
  this.handleClearForm(event);
}

handleSellSubmit(event){
  event.preventDefault();
  let formPayload = {
    ticker: this.state.ticker,
    share_amount: -(this.state.share_amount)
  }
  this.props.makeTrade(formPayload)
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
      <form className="form">
      <div>
      <TextField
      content={this.state.ticker}
      label= "Ticker"
      name="ticker"
      handlerFunction={this.handleChange}
      />
      </div>
      <div>
      <TextField
        content={this.state.share_amount}
        label= "Shares"
        name="share_amount"
        handlerFunction={this.handleChange}
      />
      </div>
      <div>
        <button type="button"
        className="buy"
        onClick={this.handleBuySubmit}>
          Buy
        </button>
        <button type="button"
         className="sell"
         onClick={this.handleSellSubmit}>
          Sell
        </button>
      </div>
      </form>
    )
  }
}

export default TradeForm;
