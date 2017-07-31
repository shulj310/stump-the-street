import React, { Component } from 'react';
import TextField from '../components/TextField'
import {Button, Icon} from 'react-materialize'
import { errorDictionary } from '../utils/tradingErrorDictionary'


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
  this.handleError = this.handleError.bind(this)
  this.errorLister = this.errorLister.bind(this)
}


handleError(field){
  return errorDictionary(field).conditional(this.state[field])
}

errorLister(){

  let errors = Object.keys(this.state).map((key)=> {
    if (key !== 'side'){
      if (this.handleError(key)) {
        return errorDictionary(key).message
        }
      }
    })
  return errors.filter(key => key !== undefined)
  // let newErrors = errors.filter(key => key !== undefined)
  // this.setState({errorList:newErrors})
  // return newErrors
}


handleBuySubmit(event){
  event.preventDefault();

  let errorList = this.errorLister()

  if (errorList.length === 0){

  let formPayload = {
    ticker: this.state.ticker,
    share_amount: this.state.share_amount,
    side: true
  }
  this.props.makeTrade(formPayload)
  this.handleClearForm(event);
} else {
  alert('Can only trade stock w/ in Russell 1000!')
}
}

handleSellSubmit(event){
  event.preventDefault();

  let errorList = this.errorLister()

  let currentHoldings = this.props.stocks.map((stock)=>{
      return (stock.ticker)
    })

  if (errorList.length === 0 && currentHoldings.includes(this.state.ticker.toUpperCase())
    ){
  let formPayload = {
    ticker: this.state.ticker,
    share_amount: this.state.share_amount,
    side:false
  }
  this.props.makeTrade(formPayload)
  this.handleClearForm(event)
} else{
    alert('Can only sell stock that you own!')
  }
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
