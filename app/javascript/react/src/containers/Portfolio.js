import React, { Component } from 'react';
import { Icon, Link } from 'react-materialize'
import StockComponenet from '../components/StockComponent';
import TradeForm from './TradeForm';
import PortfolioDash from '../components/PortfolioDash';
import ReactTable from 'react-table';
import numeral from 'numeral'

class Portfolio extends Component{
  constructor(props){
  super(props)
  this.state = {
    stocks: [],
    portfolio: {},
    chartLength: 3,
    last_trade: false,
    shares_traded: 0,
    loading:false
  }
  this.makeTrade = this.makeTrade.bind(this)
  this.newStocks = this.newStocks.bind(this)
}
    newStocks(){
      fetch('/api/v1/competitions/1/portfolios/1/stocks',{
        credentials: "same-origin"
      })
      .then(response => response.json())
      .then(body =>{


        function filterByShares(object){
          return object.shares > 0
        }

        let portfolio = body.filter(filterByShares)

        let newPortfolio = portfolio.map((position)=>{
          position["return"] = position["price"]/position["cost"]-1
        })

        let chartLength = portfolio.length
        this.setState({ stocks: portfolio, chartLength: chartLength })
      })
      fetch('/api/v1/competitions/1/portfolios/1',{
        credentials: 'same-origin'
      })
      .then(response => response.json())
      .then(body=>{
        this.setState({ portfolio: body, loading: false })
      })
    }

    refreshButton(){
      this.setState({loading:true})
      this.newStocks()
    }

  componentDidMount(){
    this.newStocks()
  }



  makeTrade(payLoad){
    this.setState({last_trade: payLoad.side,shares_traded: payLoad.share_amount})
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
      body["return"] = body["price"]/body["cost"]-1

      let updateValue = body.stock.price * this.state.shares_traded

      let new_portfolio = this.state.portfolio
      if (this.state.last_trade)
      {new_portfolio["cash"] -= updateValue} else {
        {new_portfolio["cash"] += updateValue}
      }

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
          accessor: 'value',
          Cell: props => <span className='number'>{numeral(props.value).format('$0,0.00')}</span>
        },{
          Header: 'Price',
          accessor: 'price',
          Cell: props => <span className='number'>{numeral(props.value).format('$0,0.00')}</span>
        },{
          Header: 'Cost',
          accessor: 'cost',
          Cell: props => <span className='number'>{numeral(props.value).format('$0,0.00')}</span>
        },
        {
          Header: 'Return',
          accessor: 'return',
          Cell: props => <span className='number'>{numeral(props.value).format('0.00%')}</span>
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
          loading={this.state.loading}
        />
        </div>
    )
  }
}

export default Portfolio;
