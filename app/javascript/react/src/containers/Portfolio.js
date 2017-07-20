import React, { Component } from 'react';
import StockComponenet from '../components/StockComponent';
import TradeForm from './TradeForm'

class Portfolio extends Component{
  constructor(props){
  super(props)
  this.state = {
    stocks: []
  }
  this.makeTrade = this.makeTrade.bind(this)
}

  componentDidMount(){
    fetch('/api/v1/portfolios/1/stocks')
    .then(response => response.json())
    .then(body =>{
      this.setState({ stocks: body})
    })
  }


  makeTrade(payLoad){
    fetch('/api/v1/portfolio/1/stocks', {
      method: "POST",
      body: JSON.stringify(payLoad)
    }).then(response =>{
      let body = response.json()
      return body
    }).then(body=>{
      let newComps = this.state.stock.slice()
      newComps.unshift(body)
      this.setState({stocks: newComps})
    })
  }

  render (){

    let stocks = this.state.stocks.map( (stock,index) =>{
      return(
        <StockComponenet
          key= {index}
          stock = {stock}
        />
      )
    })
    return(
        <div>
          {stocks}
          <TradeForm
            makeTrade = {this.makeTrade}
            />
        </div>
    )
  }
}

export default Portfolio;
