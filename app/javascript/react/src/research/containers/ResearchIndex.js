import React, { Component } from 'react'
import TextField from '../../components/TextField'
import SelectField from '../../components/SelectField'
import { Col, Row, Input } from 'react-materialize'
import ShowCard from '../components/ShowCard'

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
      currentPositions:[],
      cash:0,
      stockObject:{},
      shares:0,
      compareTicker:"",
      compareTickers:[],
      compareData:[],
      compareStockId:{},
      newField:"",
      tags:['Price/Earnings','Market Cap','Revenue Growth'],
      stockHeader:[],
      industryData:[]
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
  }

  componentDidMount(){
    this.getPortfolioData()
  }

  getPortfolioData(){
    fetch('/api/v1/portfolios',{
      credentials: 'same-origin'})
    .then(response=>response.json())
    .then(body=>{
      let portfolios = body.map(port => port.name)
      portfolios.unshift("Select Portfolio")
      this.setState({portfolios:body,strategyNames:portfolios})
    })
  }

  search(event){
    event.preventDefault()
    // this.headerData(this.state.ticker)
    this.grabData(this.state.ticker,{tags:this.state.tags},false)
    this.grabIndustryData(this.state.ticker,{tags:this.state.tags})
    this.getStockObject(this.state.ticker)
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
        debugger;
        compareData.push(body)
        this.setState({compareData:compareData})
      }else{
        this.setState({stockData:body})
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

  }

//PASSED DOWN TO child components

  handleChange(event){
    this.setState({[event.target.name]:event.target.value})
    if (event.target.name === 'selectedPortfolio'){
      this.queuePortfolio(event.target.value)
      this.getStockObject(this.state.ticker)
    }
  }

  compare(event){
    event.preventDefault()
    let compareTickers = this.state.compareTickers
    compareTickers.push(this.state.compareTicker)
    this.grabData(this.state.compareTicker,{tags:this.state.tags})
    this.setState({compareTickers:compareTickers,compareTicker:""})
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
    newTags.unshift(field)
    if (field.trim()!==""){
      this.grabData(this.state.ticker,{tags:newTags},false)
      this.grabIndustryData(this.state.ticker,{tags:newTags})
      this.state.compareData.forEach(ticker=>{
        this.grabData(Object.keys(ticker)[0],{tags:newTags})
      })
      this.setState({tags:newTags,newField:""})
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


  render(){

    let portfolioNames = this.state.strategyNames.map((name,index)=>{
      return(
      <option key={index} value={name}>{name}</option>)
    })

    return(
      <div>
        <Row>
          <Input s={4} name="selectedPortfolio" type='select'
            defaultValue={this.state.selectedPortfolio}
            onChange={this.handleChange}>
              {portfolioNames}
          </Input>
        </Row>
        <label>{this.state.selectedPortfolio} cash: {this.state.cash}</label>
        <Row>
          <Col s={6}>

            </Col>
            <Col s={6}>
            </Col>
        </Row>
        <Row>
          <Col s={6}>
            <ShowCard
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
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default ResearchIndex
