import React from 'react'

const TestContainer = props =>{

  let ticker,price,size

  debugger;

  if (Object.keys(props).length > 0){
    ticker = props.ticker
    price = props.price
    size = props.size
  }

  return(

    <h1>{ticker}: {price},{size} </h1>
  )
}

export default TestContainer
