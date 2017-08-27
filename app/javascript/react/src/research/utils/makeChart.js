import {priceAdjuster} from '../utils/priceAdjuster'
import {dateFixer } from '../utils/dateFixer'
import { chartColorPicker } from '../utils/chartColorOptions'

export function makeChart(tickerList){

  let chartData = tickerList.map((ticker,index)=>{

    let pricingData = Object.values(ticker)[0]
    let tik = Object.keys(ticker)[0]
    let prices = Object.values(pricingData)
    let colors = chartColorPicker(index)
    let data = {
        label: tik,
        borderWidth: 3,
        pointRadius: 0,
        data: prices
      }
    Object.keys(colors).forEach(key=> data[key] = colors[key])
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
