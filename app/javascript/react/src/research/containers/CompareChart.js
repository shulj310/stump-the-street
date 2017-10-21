import React, { Component } from 'react'
import {Line,Bar} from "react-chartjs-2"
import numeral from 'numeral'
import {priceAdjuster} from '../utils/priceAdjuster'

// legacy fetch polyfill
// https://stackoverflow.com/questions/35830202/fetch-not-defined-in-safari-referenceerror-cant-find-variable-fetch
import 'whatwg-fetch';

class CompareChart extends Component{
  constructor(props){
  super(props);
  this.state ={
      ticker:"",
      compareTickers:[],
      stockPrices:[],
      chartData:[]
  }
    this.loadTicker = this.loadTicker.bind(this)
    this.updateCompareTicker = this.updateCompareTicker.bind(this)
    this.loadTickerPrices = this.loadTickerPrices.bind(this)
    this.makeChart = this.makeChart.bind(this)
  }

  makeChart(){
    let firstPrice = 0
    let chartData = this.state.stockPrices.map((ticker,index)=>{

      let pricingData = Object.values(ticker)[0]
      let tik = Object.keys(ticker)[0]
      let prices = Object.values(pricingData)
      if(index==0){
        firstPrice = prices[0]
        console.log(firstPrice,tik)
      } else {
        console.log(firstPrice,tik)
        prices = priceAdjuster(prices,firstPrice)
      }

      let data = {
          label: tik,
          backgroundColor:  'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          pointRadius: 0,
          data: prices
        }
      return(
        data
      )
    })

    let data = {
      labels: Object.keys(Object.values(this.state.stockPrices[0])[0]),
      datasets: chartData
    }
    this.setState({chartData:data})
  }

  loadTickerPrices(ticker){
    fetch(`/api/v1/research/${ticker}/historical_data/date_type/90`)
    .then(response=>response.json())
    .then(body=>{
      this.state.stockPrices.unshift(body)
      this.setState({stockPrices:this.state.stockPrices})
    })
    setTimeout(this.makeChart,1000)
  }

  updateCompareTicker(){
    if (this.state.compareTickers !== this.props.compareData){
      this.setState({compareTickers:this.props.compareData})
    }
  }

  loadTicker(){
    if (this.state.ticker !== this.props.ticker){
      this.loadTickerPrices(this.props.ticker)
      this.loadTickerPrices("SPY")
      this.setState({ticker:this.props.ticker})
    }
  }

  componentDidUpdate(){
    setTimeout(this.loadTicker,2000)
    this.updateCompareTicker()
  }

  render(){

    return(

        <div>
        <Line
          data={this.state.chartData}
        />
        </div>

    )
  }
}

export default CompareChart
