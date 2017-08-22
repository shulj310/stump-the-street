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
      tags:['Beta','Volume','52 Week High'],
      stockHeader:[]
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

  fillData(event){
    event.preventDefault()
    this.setState({newField:event.target.id})

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
      this.setState({stockData:body})
    })
  }

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
    this.grabCompareData(this.state.compareTicker)
    this.setState({compareTickers:compareTickers,compareTicker:""})
  }

  clearSearch(event){
    event.preventDefault()
    this.setState({ticker:""})
  }

  search(event){
    event.preventDefault()
    this.headerData(this.state.ticker)
    this.grabData(this.state.ticker,{tags:this.state.tags},false)
    this.getStockObject(this.state.ticker)
  }

  removeField(event){
    event.preventDefault()
    let tag = event.target.id
    let tags = this.state.tags
    let newTags = tags.filter(field => field != tag)
    this.grabData(this.state.ticker,{tags:newTags},false)
    this.setState({tags:newTags})
  }

  newField(event){
    event.preventDefault()
    let field = this.state.newField
    let newTags = this.state.tags
    newTags.unshift(field)
    debugger;
    this.grabData(this.state.ticker,{tags:newTags},false)
    this.setState({tags:newTags,newField:""})
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
    fetch(`/api/v1/research/${ticker}/search`)
    .then(response=>response.json())
    .then(body=>{
      let sic = Object.values(body[ticker].filter(ob => Object.keys(ob)=="SIC")[0])[0]
      let compareData = this.state.compareData
      compareData.push(body)
      this.setState({compareData:compareData})
    })
    this.compareStockId(ticker)
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
  componentDidMount(){
    this.getPortfolioData()
  }

  render(){

    let portfolioNames = this.state.strategyNames.map((name,index)=>{
      return(
      <option key={index} value={name}>{name}</option>)
    })

    let currentCompares = this.state.compareTickers.map((name,index)=>{
      return(
        <span key={index}>{name}</span>
      )
    })

    let currentComparesShow = this.state.compareData.map((ticker,index)=>{

      let tik = Object.keys(ticker)[0]
      let tickerId = this.state.compareStockId[tik]
      let shares = this.sharesInCompare(tickerId)
      let data = Object.values(ticker)[0]
      let details = data.map((field,index)=>{
        return(<span key={index}>{Object.keys(field)}:{ Object.values(field)}</span>)
      })
      return(
        <div key={index}>{tik}: {shares}<br/>{details}</div>
      )
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
            />
          </Col>
        </Row>
        <Row>
          <form className="form" onSubmit={this.compare}>
            <Col s={6}>
              <TextField
              content={this.state.compareTicker}
              label= "Compare"
              name="compareTicker"
              handlerFunction={this.handleChange}
              />
              <button
              className = "btn btn-small waves-effect waves-light blue-grey darken-2"
              type="submit">
              Compare
              </button>
            </Col>
            <Col s={6}>
              {currentComparesShow}
            </Col>
          </form>
        </Row>
        {currentCompares}
      </div>
    )
  }
}

export default ResearchIndex
