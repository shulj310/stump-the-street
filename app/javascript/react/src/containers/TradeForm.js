import React, { Component } from 'react';
import TextField from '../components/TextField'
import {Button, Icon, Row, Col} from 'react-materialize'
import { errorDictionary } from '../utils/tradingErrorDictionary'
import PreTradeContainer from '../components/PreTradeContainer'


class TradeForm extends Component{
  constructor(props){
  super(props)
  this.state = {
    ticker: "",
    share_amount: "",
    side: null,
    stockData: {},
    fundData: {},
    tickerLoaded: false,
    histPrice: {}
  }
  this.handleChange = this.handleChange.bind(this)
  this.handleBuySubmit = this.handleBuySubmit.bind(this)
  this.handleSellSubmit = this.handleSellSubmit.bind(this)
  this.handleClearForm = this.handleClearForm.bind(this)
  this.handleError = this.handleError.bind(this)
  this.errorLister = this.errorLister.bind(this)
  this.handleTicker = this.handleTicker.bind(this)
  this.handFundData = this.handFundData.bind(this)
}


handleError(field){
  return errorDictionary(field).conditional(this.state[field])
}

errorLister(){

  let errors = Object.keys(this.state).map((key)=> {
    if ((key !== 'side') && (key !== 'stockData') && (
        key !=='fundData') && (key !== 'tickerLoaded')
        && (key !== 'histPrice')
    ){
      if (this.handleError(key)) {
        return errorDictionary(key).message
        }
      }
    })
  return errors.filter(key => key !== undefined)
}


handleBuySubmit(event){
  event.preventDefault();

  let errorList = this.errorLister()

  let futureCash = (this.props.portfolio.cash) > (this.state.share_amount * this.state.stockData.lastPrice)

  if (errorList.length === 0 && futureCash){

  let formPayload = {
    ticker: this.state.ticker,
    share_amount: Math.floor(this.state.share_amount),
    side: true
  }
  this.props.makeTrade(formPayload)
  this.handleClearForm(event);
}
  if (errorList.length > 1){
    alert(errorList.join(" \n\n"))
  }
  if (errorList.length == 1){
    alert(errorList.join(" "))
  }
  if (!futureCash && this.state.stockData.lastPrice) {
    alert('Not enough cash for this trade!')
  }
}

handleSellSubmit(event){
    event.preventDefault();

    let errorList = this.errorLister()

    let a = {}

    this.props.stocks.forEach((stock)=>{
        a[stock.ticker] = stock.shares
      })

    let ticker = this.state.ticker.toUpperCase()

    if (errorList.length === 0 && Object.keys(a).includes(ticker) && Math.floor(this.state.share_amount) <= a[ticker])
      {
    let formPayload = {
      ticker: this.state.ticker,
      share_amount: Math.floor(this.state.share_amount),
      side:false
    }
    this.props.makeTrade(formPayload)
    this.handleClearForm(event)
      }
    if (this.state.share_amount > a[ticker]){
        alert('Cannot short sell positions!')
      }
    if (errorList.length > 1){
          alert(errorList.join(" \n\n"))
      }
    if (errorList.length == 1){
      alert(errorList.join(" "))
    }
    if (!Object.keys(a).includes(ticker)){
      alert('Cannot short sell positions!')
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
        if (body["results"][0]){
        let data = body["results"][0]
        this.setState({stockData:data,tickerLoaded:true})}
      else{
        this.setState({stockData:{},tickerLoaded:false})
      }})
      .catch(error=> {
        this.setState({stockData:{},tickerLoaded:false})
        console.error(`Ticker does not exist: ${error.message}`)
    })
    }
  }
handFundData(event){
  fetch(`/api/v1/stocks/${this.state.ticker}/fund_data`,{
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
    if (body["data"] !== null){
      this.setState({fundData:body})}
    else{
      this.setState({fundData:{}})
    }})
    .catch(error=> {
      this.setState({fundData:{}})
  })
  fetch(`/api/v1/stocks/${this.state.ticker}/hist_price`,{
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
    if (body["data"] !== null){
      this.setState({histPrice:body})}
    else{
      this.setState({histPrice:{}})
    }})
    .catch(error=> {
      this.setState({histPrice:{}})
  })
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
              fundData = {this.state.fundData}
              fundDataHandler = {this.handFundData}
              tickerLoaded = {this.state.tickerLoaded}
              histPrice = {this.state.histPrice}
            />
          </div>
        </div>
      </div>

    )
  }
}

export default TradeForm;
