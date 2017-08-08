import React from 'react'
import {Line,Bar} from "react-chartjs-2"
import numeral from 'numeral'

const StockChart = props =>{

  let labels = [],
  prices = [],
  volume = [],
  ticker,
  data,
  graph

  if (props.data["results"] != undefined){
  props.data["results"].forEach((data)=>{
    prices.push(data["close"])
    labels.push(data["tradingDay"])
    volume.push(data["volume"])
  })

  // if (prices[0] < prices[prices.length-1]) {
  //   backgroundColor: 'rgba(255,99,132,0.2)',
  //   borderColor: 'rgba(255,99,132,1)',
  //   borderWidth: 1,
  //   hoverBackgroundColor: 'rgba(255,99,132,0.4)',
  //   hoverBorderColor: 'rgba(255,99,132,1)',
  // }
}

  data = {
    labels: labels,
    datasets: [
      {
        label: props.ticker,
        backgroundColor:  'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        pointRadius: 0,
        data: prices
      }
    ]
  };

  if (prices.length > 0){
    graph = <Line
      data={data}
    />
  }


  return(
    <div>
      {graph}
    </div>
  )
}

export default StockChart
