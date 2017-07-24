import React, { Component } from 'react';
import { Icon } from 'react-materialize'
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
      this.setState({ stocks: body })
    })
  }


  makeTrade(payLoad){
    fetch('/api/v1/portfolios/1/stocks', {
      method: "POST",
      body: JSON.stringify(payLoad)
    }).then(response =>{
      let body = response.json()
      return body
    }).then(body=>{

      let newPosition = this.state.stocks.slice()

      function currentlyOwns(id) {
        return id === body.stock_id
      }

      function filterById(object) {
        if (currentlyOwns(object.stock_id)){
          return false
        }
        else{
          return true
        }
      }

      let filteredPositions = newPosition.filter(filterById)

      body["ticker"] = body.stock.ticker
      body["price"] = body.stock.price


      filteredPositions.unshift(body)
      this.setState({stocks: filteredPositions})
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
        <div className="body">
              <h2>My Portfolio </h2>
          <TradeForm
          makeTrade = {this.makeTrade}
          />
          <table>
          <tbody>
          <tr>
            <th>Ticker</th>
            <th>Shares</th>
            <th>Mkt Value</th>
            <th>Price</th>
            <th>Cost</th>
            <th>Return</th>
          </tr>
          {stocks}
          </tbody>
        </table>
        </div>
    )
  }
}

export default Portfolio;
