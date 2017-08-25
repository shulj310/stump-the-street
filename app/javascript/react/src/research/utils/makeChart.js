import {priceAdjuster} from '../utils/priceAdjuster'
import {dateFixer } from '../utils/dateFixer'

export function makeChart(tickerList){



  let firstPrice = 0
  let chartData = tickerList.map((ticker,index)=>{

    let pricingData = Object.values(ticker)[0]
    let tik = Object.keys(ticker)[0]
    let prices = Object.values(pricingData)
    if(index==0){
      firstPrice = prices[0]
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
    labels: dateFixer(Object.keys(Object.values(tickerList[0])[0])),
    datasets: chartData
  }
return(data)

}
