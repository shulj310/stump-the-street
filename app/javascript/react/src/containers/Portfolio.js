import React, { Component } from 'react';
import { Icon } from 'react-materialize'
import StockComponenet from '../components/StockComponent';
import TradeForm from './TradeForm';
import PortfolioDash from '../components/PortfolioDash';
import ReactTable from 'react-table'

class Portfolio extends Component{
  constructor(props){
  super(props)
  this.state = {
    stocks: [],
    portfolio: {},
    chartLength: 3
  }
  this.makeTrade = this.makeTrade.bind(this)
}

  componentDidMount(){
    fetch('/api/v1/portfolios/1/stocks',{
      credentials: "same-origin"
    })
    .then(response => response.json())
    .then(body =>{


      function filterByShares(object){
        return object.shares > 0
      }


      let portfolio = body.filter(filterByShares)
      let chartLength = portfolio.length
      this.setState({ stocks: portfolio, chartLength: chartLength })
    })
    fetch('/api/v1/portfolios/1',{
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(body=>{
      this.setState({ portfolio: body })
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
      body["value"] = body.stock.price * body.shares

      let new_portfolio = this.state.portfolio
      new_portfolio["cash"] -= body["value"]

      filteredPositions.unshift(body)
      this.setState({stocks: filteredPositions,portfolio:new_portfolio,chartLength: filteredPositions.length})
    })
  }

  render (){

    const columns = [{
        Header: 'Stock Info',
        columns: [{
          Header: 'Ticker',
          accessor: 'ticker'
        }, {
          Header: 'Shares',
          accessor: 'shares'
        }]
      }, {
        Header: 'Value',
        columns: [{
          Header: 'Market Value',
          accessor: 'value'
        },{
          Header: 'Price',
          accessor: 'price'
        },{
          Header: 'Cost',
          accessor: 'cost'
        }]
      }]

    return(
        <div className="body">
          <PortfolioDash
            portfolio={this.state.portfolio}
          />
          <TradeForm
          makeTrade = {this.makeTrade}
          />
        <ReactTable
          data={this.state.stocks}
          columns={columns}
          minRows={this.state.chartLength}
          defaultPageSize={20}
        />
        </div>
    )
  }
}

export default Portfolio;
