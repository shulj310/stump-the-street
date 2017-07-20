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
        <div>
          <h2>My Portfolio </h2>
          <hr/>
          <TradeForm
          makeTrade = {this.makeTrade}
          />
          <hr/>
          {stocks}
          <hr/>
        </div>
    )
  }
}

export default Portfolio;
