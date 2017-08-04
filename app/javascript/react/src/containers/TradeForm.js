import React, { Component } from 'react';
import TextField from '../components/TextField'
import {Button, Icon, Row, Col} from 'react-materialize'
import { errorDictionary } from '../utils/tradingErrorDictionary'
import PreTradeContainer from './PreTradeContainer'


class TradeForm extends Component{
  constructor(props){
  super(props)
  this.state = {
    ticker: "",
    share_amount: "",
    side: null,
    stockData: {}
  }
  this.handleChange = this.handleChange.bind(this)
  this.handleBuySubmit = this.handleBuySubmit.bind(this)
  this.handleSellSubmit = this.handleSellSubmit.bind(this)
  this.handleClearForm = this.handleClearForm.bind(this)
  this.handleError = this.handleError.bind(this)
  this.errorLister = this.errorLister.bind(this)
  this.handleTicker = this.handleTicker.bind(this)
}


handleError(field){
  return errorDictionary(field).conditional(this.state[field])
}

errorLister(){

  let errors = Object.keys(this.state).map((key)=> {
    if ((key !== 'side') && (key !== 'stockData')){
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
    side: null,
    stockData:{}
  })
}

  handleChange(event){
    this.setState({[event.target.name]:event.target.value})
  }

  handleTicker(event){
    let ticker = event.target.value
    this.setState({ticker:ticker})
    if (event.target.value !== ""){

    fetch(`/api/v1/stocks/${ticker}`,{
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok){
        return response; }
        else {
            let errorMessage = `${response.status} (${response.statusText})`,
                error = new Error(errorMessage);
            throw(error);
          }
      })
      .then(response=> response.json())
      .then(body=>{
        if (body){
        let data = body["results"][0]
        this.setState({stockData:data})}
      })
      .catch(error=> console.error(`Ticker does not exist: ${error.message}`))
    } else {
      this.setState({stockData:{}})
    }
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
                handlerFunction={this.handleTicker}
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
          </form>
          <div className="col 10">
            <PreTradeContainer
              ticker={this.state.ticker}
              shares={this.state.share_amount}
              stockData = {this.state.stockData}
            />
          </div>
        </div>
      </div>

    )
  }
}

export default TradeForm;
