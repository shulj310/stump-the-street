export function priceAdjuster(prices,firstPrice){

  let divisor = prices[0]/firstPrice

  let newPrices = prices.map((price)=>{

    return(
      price/divisor
    )
  })
}
