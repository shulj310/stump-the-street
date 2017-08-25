export function priceAdjuster(prices,firstPrice){

  let divisor = prices[0]/firstPrice

  debugger;

  let newPrices = prices.map((price)=>{

    return(
      price/divisor
    )
  })
}
