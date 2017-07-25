import React, { Component } from 'react';
import TextField from '../components/TextField'
import {Button, Icon} from 'react-materialize'


class TradeForm extends Component{
  constructor(props){
  super(props)
  this.state = {
    ticker: "",
    share_amount: "",
    side: null
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
    share_amount: this.state.share_amount,
    side: true
  }
  this.props.makeTrade(formPayload)
  this.handleClearForm(event);
}

handleSellSubmit(event){
  event.preventDefault();
  let formPayload = {
    ticker: this.state.ticker,
    share_amount: this.state.share_amount,
    side:false
  }
  this.props.makeTrade(formPayload)
  this.handleClearForm(event);
}

handleClearForm(event){
  event.preventDefault();
  this.setState({
    share_amount: "",
    ticker:"",
    side: null
  })
}

  handleChange(event){
    this.setState({[event.target.name]:event.target.value})
  }

  render(){

    return(
    <div className="row">
      <div className="col s12">
        <form className="col 2">
        <div className="row">
          <div className="col s12">
            <div className="row">
            <TextField
              content={this.state.ticker}
              label= "Ticker"
              name="ticker"
              handlerFunction={this.handleChange}
              />
              <TextField
                content={this.state.share_amount}
                label= "Shares"
                name="share_amount"
                handlerFunction={this.handleChange}
              />
              <div>
                <a
                  className="waves-effect waves-light btn buy btn-small"
                  onClick={this.handleBuySubmit}>
                  Buy
                </a>
                <a
                  className="waves-effect waves-light btn sell btn-small"
                  onClick={this.handleSellSubmit}>
                  Sell
                </a>
              </div>
            </div>
          </div>
        </div>
        <div>
        </div>
        </form>
      </div>
    </div>
    )
  }
}

export default TradeForm;
