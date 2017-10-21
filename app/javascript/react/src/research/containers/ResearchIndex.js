import React, { Component } from 'react'
import TextField from '../../components/TextField'
import SelectField from '../../components/SelectField'
import { Col, Row, Input } from 'react-materialize'
import ShowCard from '../components/ShowCard'
import { fieldValidator } from '../utils/fieldValidator'
import CompareChart from './CompareChart'
import { makeChart } from '../utils/makeChart'
import Chart from '../components/Chart'
import ViewChanger from '../components/ViewChanger'

// legacy fetch polyfill
// https://stackoverflow.com/questions/35830202/fetch-not-defined-in-safari-referenceerror-cant-find-variable-fetch
import 'whatwg-fetch';

class ResearchIndex extends Component{
  constructor(props){
  super(props)
    this.state = {
      ticker:"",
      stockData:{},
      sic:"",
      portfolios:[],
      strategyNames:[],
      selectedPortfolio:"",
      currentPortfolio:{},
      showPortfolio:true,
      currentPositions:[],
      cash:0,
      stockObject:{},
      shares:0,
      compareTicker:"",
      compareTickers:[],
      compareData:[],
      compareStockId:{},
      newField:"",
      tags:['Company Name','Market Cap','Price/Earnings','Operating Margin'],
      stockHeader:[],
      industryData:[],
      showTable:false,
      chartPrices:[],
      chartData:{},
      date:90,
      relative:false,
      show:1,
      showViewChange:false,
      stockList:[]
    }

    this.handleChange = this.handleChange.bind(this)
    this.search = this.search.bind(this)
    this.grabData = this.grabData.bind(this)
    this.clearSearch = this.clearSearch.bind(this)
    this.getPortfolioData = this.getPortfolioData.bind(this)
    this.compare = this.compare.bind(this)
    this.grabCompareData = this.grabCompareData.bind(this)
    this.compareStockId = this.compareStockId.bind(this)
    this.newField = this.newField.bind(this)
    this.removeField = this.removeField.bind(this)
    this.fillData = this.fillData.bind(this)
    this.grabIndustryData = this.grabIndustryData.bind(this)
    this.removeTicker = this.removeTicker.bind(this)
    this.loadTickerPrices = this.loadTickerPrices.bind(this)
    this.removeTickerPrices = this.removeTickerPrices.bind(this)
    this.changeDate = this.changeDate.bind(this)
    this.reloadTickerPrices = this.reloadTickerPrices.bind(this)
    this.changeRelative = this.changeRelative.bind(this)
    this.changeView = this.changeView.bind(this)
    this.changeViewAgain = this.changeViewAgain.bind(this)
    this.getStockList = this.getStockList.bind(this)
    this.validateTicker = this.validateTicker.bind(this)
    this.tradeTicker = this.tradeTicker.bind(this)
  }

  componentDidMount(){
    this.getPortfolioData()
    this.getStockList()
  }

  getPortfolioData(){
    fetch('/api/v1/portfolios',{
      credentials: 'same-origin'})
    .then(response=>response.json())
    .then(body=>{
      let portfolios = body.map(port => port.name)
      portfolios.unshift("Select Portfolio")
      this.setState({portfolios:body,strategyNames:portfolios,showPortfolio:true})
    })
    .catch(this.setState({showPortfolio:false}))
  }

  getStockList(){
    fetch('/api/v1/stocks/get/tickers')
    .then(response=>response.json())
    .then(body=>{
      this.setState({stockList:body})
    })
  }

  validateTicker(ticker){
    return (this.state.stockList.includes(ticker.toUpperCase()))
  }

  tradeTicker(event){
    event.preventDefault()
    let ticker = this.state.ticker
    let pid = this.state.currentPortfolio.id
    document.location.replace(`/competitions/trade/portfolios/${pid}/ticker/${ticker}`)
    // if (this.state.showPortfolio){
    //   if (this.state.selectedPortfolio == ""){
    //     alert('Select Portfolio!')
    //   } else {
    //     if (this.state.ticker == ""){
    //       alert('Enter Ticker!')
    //     } else {
    //     }
    //   }
    // }else {
    //   debugger;
    //   // document.location.replace(`/users/sign_in`)
    //   alert('Please create a competition to trade!')
    // }
  }

  removeTickerPrices(ticker){
    let data = this.state.chartData
    data.datasets = data.datasets.filter(t => t.label !== ticker)
    let tickerPrices = this.state.chartPrices.filter(tik => Object.keys(tik)[0] !== ticker)
    this.setState({chartPrices:tickerPrices,chartData:data})

  }

  search(event){
    event.preventDefault()
    if (this.validateTicker(this.state.ticker)){
      this.grabData(this.state.ticker,{tags:this.state.tags},false)
      this.grabIndustryData(this.state.ticker,{tags:this.state.tags})
      this.getStockObject(this.state.ticker)
      this.loadTickerPrices(this.state.ticker,this.state.date,false,this.state.relative,true)
      this.setState({show:2,showViewChange:true})
    } else{
    alert('Please enter valid ticker!')
    }
  }

  headerData(ticker){
    fetch(`api/v1/research/${ticker}/header`)
    .then(response=>response.json())
    .then(body=>{
      let sic = Object.values(body[ticker].filter(ob=> Object.keys(ob)[0].includes("SIC"))[0])[0]
      this.setState({stockHeader:body,sic:sic})
    })
  }

  grabData(ticker,payLoad,compare=true){
    fetch(`/api/v1/research/${ticker}`,{
      method:"PUT",
      credentials:'same-origin',
      body:JSON.stringify(payLoad)
    })
    .then(response=>response.json())
    .then(body=>{
      if (compare){
        let compareData = this.state.compareData.filter(stock=>Object.keys(stock)[0] !== ticker)
        compareData.push(body)
        this.setState({compareData:compareData})
      }else{
        this.setState({stockData:body,showTable:true})
      }
    })
  }

  grabIndustryData(ticker,payLoad,compare=false){
    fetch(`/api/v1/research/${ticker}/industry_comp`,{
      method:"PUT",
      credentials:'same-origin',
      body:JSON.stringify(payLoad)
    })
    .then(response=>response.json())
    .then(body=>{
      this.setState({industryData:body})
    })
  }

  getStockObject(ticker){
    fetch(`/api/v1/stocks/${ticker}/id`)
    .then(response=>response.json())
    .then(body=>{
      let positionId = this.state.currentPositions.filter(pos=>pos.stock_id==body["id"])[0]
      if (positionId === undefined){
        this.setState({stockObject:{},shares:0})
      }
      else{
        this.setState({stockObject:body,shares:positionId.shares})
      }
    })
  }

//PASSED DOWN TO AUTOSUGGEST

  fillData(event){
    event.preventDefault()
    let field = event.target.id
    let newTags = this.state.tags
    newTags.unshift(field)
    this.grabData(this.state.ticker,{tags:newTags},false)
    this.setState({tags:newTags,newField:""})
    this.grabIndustryData(this.state.ticker,{tags:newTags})
    this.state.compareData.forEach(ticker=>{
      this.grabData(Object.keys(ticker)[0],{tags:newTags})
    })
    $('.modal.open').modal('close')
  }

//PASSED DOWN TO child components

  handleChange(event){
    this.setState({[event.target.name]:event.target.value})
    if (event.target.name === 'selectedPortfolio'){
      this.queuePortfolio(event.target.value)
      this.getStockObject(this.state.ticker)
    }
  }

  loadTickerPrices(ticker,date,add=false,rel=false,reload=false){
    let tick = ticker
    if (add){
      tick = `_${ticker}`
    }
    if (rel){
      if (reload){
        tick = `rel-${ticker}&SPY`
      } else {
        tick = `rel-${ticker}`
      }
    }
    fetch(`/api/v1/research/${tick}/historical_data/date_type/${date}`)
    .then(response=>response.json())
    .then(body=>{
      if (add){
        let cPrices = this.state.chartPrices
        cPrices.push(body)
        let data = makeChart(cPrices)
        this.setState({chartPrices:cPrices,chartData:data})
      }else{
        let currentChartPrices = this.state.chartPrices
        currentChartPrices.splice(0,2)
        let newData = body.concat(currentChartPrices)
        let data = makeChart(newData)
        this.setState({chartPrices:newData,chartData:data})
        }
    })
  }

  reloadTickerPrices(tickerList,date,rel=false){
    let tickerJoin = tickerList.join('&')
    if (rel){
      tickerJoin = `rel-${tickerJoin}`
    }
    fetch(`/api/v1/research/${tickerJoin}/historical_data/date_type/${date}`)
    .then(response=>response.json())
    .then(body=>{
      let newChartPrices = body
      let data = makeChart(newChartPrices)
      this.setState({chartPrices:newChartPrices,chartData:data,date:date})
    })
  }

  changeRelative(event){
    event.preventDefault()
    let rel
    if (event.target.value=="Absolute"){
      rel=false
    } else{
      rel=true
    }
    let tickers = this.state.chartPrices.map(tik=> Object.keys(tik)[0])
    this.reloadTickerPrices(tickers,this.state.date,rel)
    this.setState({relative:rel})
  }

  changeDate(event){
    event.preventDefault()
    let newDate = event.target.id
    let tickers = this.state.chartPrices.map(tik=> Object.keys(tik)[0])
    this.reloadTickerPrices(tickers,newDate,this.state.relative)
  }

  compare(event){
    event.preventDefault()
    let compareTickers = this.state.compareTickers
    if (this.validateTicker(this.state.compareTicker)){
      compareTickers.push(this.state.compareTicker)
      this.loadTickerPrices(this.state.compareTicker,this.state.date,true,this.state.relative)
      this.grabData(this.state.compareTicker,{tags:this.state.tags})
      this.setState({compareTickers:compareTickers,compareTicker:""})
    } else {
      alert('Please enter valid ticker!')
    }
}

  clearSearch(event){
    event.preventDefault()
    this.setState({ticker:""})
  }

  removeTicker(event){
    event.preventDefault()
    let ticker = event.target.id
    let tickers = this.state.compareData
    let newTickers = tickers.filter(tik => Object.keys(tik)[0] !== ticker)
    this.removeTickerPrices(ticker)
    this.setState({compareData:newTickers})
  }


  removeField(event){
    event.preventDefault()
    let tag = event.target.id
    let tags = this.state.tags
    let newTags = tags.filter(field => field != tag)
    this.grabData(this.state.ticker,{tags:newTags},false)
    this.grabIndustryData(this.state.ticker,{tags:newTags})
    this.state.compareData.forEach(ticker=>{
      this.grabData(Object.keys(ticker)[0],{tags:newTags})
    })
    this.setState({tags:newTags})
  }

  newField(event){
    event.preventDefault()
    let field = this.state.newField
    let newTags = this.state.tags
    if (fieldValidator(field)){
      newTags.unshift(field)
      this.grabData(this.state.ticker,{tags:newTags},false)
      this.grabIndustryData(this.state.ticker,{tags:newTags})
      this.state.compareData.forEach(ticker=>{
        this.grabData(Object.keys(ticker)[0],{tags:newTags})
      })
      this.setState({tags:newTags,newField:""})
    } else{
      alert('Please enter valid field')
    }
  }

  queuePortfolio(selected){
    let select = this.state.portfolios.filter(port =>port.name === selected)[0]
    let positions = select["positions"].filter(position => position.shares >0)
    this.setState({currentPortfolio:select,
        currentPositions:positions,
        cash:select.cash})
  }

  compareStockId(ticker){
    fetch(`/api/v1/stocks/${ticker}/id`)
    .then(response=>response.json())
    .then(body => {
      let compareStockId = this.state.compareStockId
      compareStockId[ticker] = body.id
      this.setState({compareStockId:compareStockId})
    })
  }

  grabCompareData(ticker){
    fetch(`/api/v1/research/${ticker}`,{
      method:"PUT",
      credentials:'same-origin',
      body:JSON.stringify(payLoad)
    })
    .then(response=>response.json())
    .then(body=>{
      let compareData = this.state.compareData
      compareData.push(body)
      this.setState({compareData:compareData})
    })
  }

  sharesInCompare(id){
    let positions = this.state.currentPositions
    let position = this.state.currentPositions.filter(pos => pos.stock_id == id)
    let shares
    if ((position == []) || position == ""){
      shares = 0
    } else{
      shares =  position[0].shares
    }
    return shares
  }

  changeView(event){
    event.preventDefault()
    let id = event.target.value
    this.changeViewAgain(id)
    this.setState({show:id})
  }
  changeViewAgain(id){
    this.setState({show:id})
  }

  render(){
    let showCard,
    chart

    if (this.state.show == 1){
      showCard =
                <Col s={12}>
                  <ShowCard
                    showTable={this.state.showTable}
                    removeTicker = {this.removeTicker}
                    compareData={this.state.compareData}
                    industryData={this.state.industryData}
                    fillData={this.fillData}
                    header={this.state.stockHeader}
                    newFieldContent = {this.state.newField}
                    newFieldHandler = {this.newField}
                    removeField = {this.removeField}
                    tags={this.state.tags}
                    content={this.state.ticker}
                    handlerFunction={this.handleChange}
                    search={this.search}
                    ticker={this.state.ticker.toUpperCase()}
                    stock={this.state.stockObject}
                    data={this.state.stockData}
                    shares={this.state.shares}
                    compareContent={this.state.compareTicker}
                    compare={this.compare}
                    trade={this.tradeTicker}
                  />
                </Col>
      chart = ""
    }
    if (this.state.show == 2){
      showCard =
        <Col s={12}>
          <ShowCard
            selectedPortfolio ={this.state.selectedPortfolio}
            showTable={this.state.showTable}
            removeTicker = {this.removeTicker}
            compareData={this.state.compareData}
            industryData={this.state.industryData}
            fillData={this.fillData}
            header={this.state.stockHeader}
            newFieldContent = {this.state.newField}
            newFieldHandler = {this.newField}
            removeField = {this.removeField}
            tags={this.state.tags}
            content={this.state.ticker}
            handlerFunction={this.handleChange}
            search={this.search}
            ticker={this.state.ticker}
            stock={this.state.stockObject}
            data={this.state.stockData}
            shares={this.state.shares}
            compareContent={this.state.compareTicker}
            compare={this.compare}
            trade={this.tradeTicker}
          />
        </Col>
      chart =
        <Col s={12}>
          <Chart
            chartData={this.state.chartData}
            changeDate={this.changeDate}
            content={this.state.date}
            changeRelative={this.changeRelative}
            relContent={this.state.relative}
          />
        </Col>
    }
    if (this.state.show == 3){
      showCard =""
      chart =
        <Col s={12}>
          <Chart
            chartData={this.state.chartData}
            changeDate={this.changeDate}
            content={this.state.date}
            changeRelative={this.changeRelative}
            relContent={this.state.relative}
          />
        </Col>
    }

    let view = ""

    if (this.state.showViewChange){
    view=  <ViewChanger
        content={this.state.show}
        handleChange={this.changeView}
      />
    }

    let portfolioNames = this.state.strategyNames.map((name,index)=>{
      return(
      <option key={index} value={name}>{name}</option>)
    })

    let portfolioShow


    if (this.state.showPortfolio) {
      portfolioShow =
            <Row>
              <Input s={4} name="selectedPortfolio" type='select'
                defaultValue={this.state.selectedPortfolio}
                onChange={this.handleChange}>
                  {portfolioNames}
              </Input>
            </Row>
    } else {
      portfolioShow = <br/>
    }

    return(
      <div>
        <h4>Stock Research Center</h4>
        {portfolioShow}
        <Row>
          {showCard}
          {chart}
        </Row>
      </div>
    )
  }
}

export default ResearchIndex

// <div className="center-align">
//   {view}
// </div>
