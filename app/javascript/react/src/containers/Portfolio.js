import React, { Component } from 'react';
import { Icon, Link, Preloader, Col, Modal } from 'react-materialize'
import StockComponenet from '../components/StockComponent';
import TradeForm from './TradeForm';
import PortfolioDash from '../components/PortfolioDash';
import ReactTable from 'react-table';
import numeral from 'numeral';
import TradeQueue from '../components/TradeQueue'
import TestContainer from '../realtime/TestContainer'

class Portfolio extends Component{
  constructor(props){
  super(props)
  this.state = {
    stocks: [],
    portfolio: {},
    chartLength: 3,
    last_trade: false,
    shares_traded: 0,
    loading:true,
    auth: true,
    tradeQueue:[],
    showTradeQueue:false,
    netCashQueue:0,
    ticker:"",
    fromResearch:false,
    lastTrade:{}
  }
  this.makeTrade = this.makeTrade.bind(this)
  this.newStocks = this.newStocks.bind(this)
  this.cancelTrade = this.cancelTrade.bind(this)
  this.getTradeQueue = this.getTradeQueue.bind(this)
  this.handleCancelTrade = this.handleCancelTrade.bind(this)
  this.liveTickers = this.liveTickers.bind(this)
}

    getTradeQueue(){
      fetch(`/api/v1/trade_queues/${this.props.match.params.port_id}`,{
        credentials: 'same-origin'
      })
      .then(response=> response.json())
      .then(body=>{
        if (body.length > 0){
        let netCash = 0
          body.forEach((trade)=>{
            if (trade.side){
              netCash -= (trade.shares * trade.stock.price)
            } else{
              netCash += (trade.shares * trade.stock.price)
            }
          })
          this.setState({showTradeQueue:true,netCashQueue:netCash})
        }
        else{
          this.setState({showTradeQueue:false,netCashQueue:0})
        }
        this.setState({tradeQueue:body})
      })
    }

    newStocks(){
      fetch(`/api/v1/competitions/${this.props.match.params.comp_id}/portfolios/${this.props.match.params.port_id}/stocks`,{
        credentials: "same-origin"
      })
      .then(response => {
        if (response.ok){
          return response.json() }
        else {
          document.location.replace(`/users/sign_in`)
        }
      })
      .then(body =>{

        if (body.auth === false) {
          document.location.replace(`/users/sign_in`)
        }

        function filterByShares(object){
          return object.shares > 0
        }

        let portfolio = body.filter(filterByShares)

        let newPortfolio = portfolio.map((position)=>{
          position["return"] = position["price"]/position["cost"]-1
        })

        let chartLength = portfolio.length
        this.setState({ stocks: portfolio, chartLength: chartLength })
        this.liveTickers(portfolio)
      })
      fetch(`/api/v1/competitions/show/portfolios/${this.props.match.params.port_id}`,{
        credentials: 'same-origin'
      })
      .then(response => response.json())
      .then(body=>{
        let portfolio = body[0]
        this.setState({ portfolio: portfolio, loading: false })
      })
      this.getTradeQueue()
      this.queueActionCable()
    }

    refreshButton(){
      this.setState({loading:true})
      this.newStocks()
    }

  componentDidMount(){
    this.newStocks()
    let ticker = this.props.match.params.ticker_id
    if ((ticker !== "")&&(ticker !== undefined)){
      ticker = ticker.toUpperCase()
      this.setState({ticker:ticker,fromResearch:true})
    }
  }

  componentWillUpdate(nextProps,nextState){

    debugger;

  }

  liveTickers(stocks){
    let tickers = stocks.map(stock => stock.ticker)
    console.log('grabbing tickers for', tickers)
    let component = this
    tickers.forEach(function(ticker) {
      if (App.portfolioChannel[ticker]) {
        return
      }
      App.portfolioChannel[ticker] = App.cable.subscriptions.create(
        {
          channel: 'StockPriceChannel',
          ticker: ticker,
        },
        {
          connected: () => console.log("StockPriceChannel connected for " + ticker),
          disconnected: function () {
            App.cable.subscriptions.remove(this)
            this.perform("unsubscribed")},
          received: data => {
            component.setState({lastTrade:data})
            component.updateStocks(data)
            console.log(data)
            console.log(component.state.stocks)
          }
        }
      )
    })
  }

  updateStocks(quote) {
    let stocks = this.state.stocks
    stocks.forEach(function(stock) {
      if (stock.ticker == quote['ticker']) {
        // TODO: makeTrade has very similar code, probably can be refactored
        stock.price = quote['price']
        stock.value = stock.price * stock.shares
        stock.return = stock.price / stock.cost - 1
      }
    })
    this.setState({ stocks: stocks })
    // TODO: recalculate portfolio totals
    // TODO: highlight updated cells in the UI
  }


  queueActionCable(){
    App.portfolioChannel = {}
  }


  cancelTrade(payLoad){
    fetch(`/api/v1/trade_queues/${this.props.match.params.port_id}`,{
      credentials: 'same-origin',
      method: 'DELETE',
      body: JSON.stringify(payLoad)
    })
    .then(response=>{
      let body = response.json()
      return body
    })
    .then(body=>{
      if (body.length == 0){
        this.setState({showTradeQueue:false})
      }
      this.setState({tradeQueue:body})
    })
  }

  handleCancelTrade(event){
    event.preventDefault();

    let formPayload = {
      tradeId:event.target.value
    }
    this.cancelTrade(formPayload)
  }


  makeTrade(payLoad){
    this.setState({last_trade: payLoad.side,shares_traded: payLoad.share_amount})
    fetch(`/api/v1/competitions/trade/portfolios/${this.props.match.params.port_id}/stocks`, {
      method: "POST",
      body: JSON.stringify(payLoad),
      credentials: 'same-origin'
    }).then(response =>{
      let body = response.json()
      return body
    }).then(body=>{

      if (body["auth"]=='after-hours'){
        this.getTradeQueue()
        alert('Your trade will be executed when the market opens!')
        if (this.state.fromResearch){
          document.location.replace(`/competitions/show/portfolios/${this.props.match.params.port_id}`)
        }
      }

      if (body["auth"]=='no-cash'){
        alert('Not enough cash to make trade!')
      } else {

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
        this.liveTickers(filteredPositions)
      }
    })
    if (this.state.fromResearch){
      document.location.replace(`/competitions/show/portfolios/${this.props.match.params.port_id}`)
    }
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

    let queueButton

    if (this.state.showTradeQueue){
      queueButton =
          <div style={{position:"relative",left:-20,bottom:-25}}>
            <Modal
            header= "Open Orders"
            trigger={
              <a className="orange darken-1 text-days btn-floating btn tooltipped">
              <Icon>assessment</Icon></a>}>
              <TradeQueue
                tradeQueue = {this.state.tradeQueue}
                cancelTrade = {this.handleCancelTrade}
              />
            </Modal>
          </div>
    }

    let table;

    if (this.state.loading){
      table = <div className="center-align">
                <Col s={4}>
                  <Preloader
                    size='big'
                    flashing/>
                </Col>
              </div>

    }else{
      table =

        <div>
          {queueButton}
          <div>
            <TestContainer
              lastTrade={this.state.lastTrade}
            />
            <ReactTable
                data={this.state.stocks}
                noDataText="Empty Portfolio!"
                columns={columns}
                minRows={this.state.chartLength}
                defaultPageSize={20}
                loading={this.state.loading}
                showPagination={false}
              />
          </div>
        </div>
    }

    return(
        <div className="body">
          <PortfolioDash
            portfolio={this.state.portfolio}
          />
          <TradeForm
          makeTrade = {this.makeTrade}
          stocks = {this.state.stocks}
          portfolio = {this.state.portfolio}
          netCashQueue = {this.state.netCashQueue}
          ticker={this.state.ticker}
          />
          {table}
        <br/>
        <br/>
        <br/>
        </div>
    )
  }
}

export default Portfolio;
