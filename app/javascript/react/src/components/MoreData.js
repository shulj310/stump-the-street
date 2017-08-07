import React from 'react'

const MoreData = props =>{

  let ticker,
  dividend_yield,
  fifty_day,
  one_yr_target,
  pe_ratio,
  price_book,
  fwd_pe,
  price_sales,
  short_ratio,
  year_high,
  year_low,
  market_cap,
  peg_ratio

  let data = props.data

  if (data !== {}){
    ticker = props.data.symbol
    dividend_yield = props.data.dividend_yield
    fifty_day = props.data.fifty_day_moving_average
    one_yr_target = props.data.oneyr_target_price
    pe_ratio = props.data.pe_ratio
    peg_ratio = props.data.peg_ratio
    price_book = props.data.price_book
    fwd_pe = props.data.price_eps_estimate_next_year
    price_sales = props.data.price_sales
    short_ratio = props.data.short_ratio
    year_high = props.data.year_high
    year_low = props.data.year_low,
    market_cap = props.data.market_capitalization
  }


  return(
    <div>
      <h5>
        Ticker: {ticker}
        Dividend Yield: {dividend_yield}
        Market Cap: {market_cap}
      </h5>
    </div>
  )
}

export default MoreData;
