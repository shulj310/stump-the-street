import React from 'react'
import {Col, Row} from 'react-materialize'
import StockChart from './StockChart'
import StockFund from './StockFund'

const MoreData = props =>{

  let ticker,
  dividend_yield = "N/A",
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
  peg_ratio,
  dataArray

  let data = props.data

  if (data !== {}){
    ticker = props.data.symbol
    dividend_yield = (props.data.dividend_yield == null ? "N/A" : props.data.dividend_yield)
    fifty_day = props.data.fiftyday_moving_average
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

    dataArray = [
    {"Dividend Yield":dividend_yield},
    {"50 Day Average":fifty_day},
    {"One Year Target":one_yr_target},
    {"P/E Ratio":pe_ratio},
    {"Price to Book":price_book},
    {"FWD P/E Ratio":fwd_pe},
    {"Price to Sales":price_sales},
    {"Short Ratio":short_ratio},
    {"One Year High":year_high},
    {"One Year Low":year_low},
    {"Market Capitalization":market_cap},
    {"PEG Ratio":peg_ratio}]
  }

  // let dataEntry = dataArray.map((field)=>{
  //   return(
  //     <div className="data-table detailed" key={Object.keys(field)}>
  //       <div className="data-table label">
  //         {Object.keys(field)}
  //       </div>
  //       <div>
  //         {Object.values(field)}
  //       </div>
  //     </div>
  //   )
  //
  // })

  let dataEntry =
      <div>
          <Row>
            <Col s={4}>
              <StockFund
                label="Dividend Yield"
                value = {dividend_yield}
              />
              <StockFund
                label="Market Capitalization"
                value = {market_cap}
              />
              <StockFund
                label="One Year Target"
                value = {one_yr_target}
              />
            </Col>
          </Row>
          <Row>
            <Col s={4}>
              <StockFund
                label="P/E Ratio"
                value = {pe_ratio}
              />
              <StockFund
                label="FWD P/E Ratio"
                value = {fwd_pe}
              />
              <StockFund
                label="Price to Book"
                value = {price_book}
              />
            </Col>
          </Row>
          <Row>
            <Col s={4}>
              <StockFund
                label="50 Day MVA"
                value = {fifty_day}
              />
              <StockFund
                label="52 Wk Hi"
                value = {year_high}
              />
              <StockFund
                label="52 Wk Lo"
                value = {year_low}
              />
            </Col>
          </Row>
      </div>


  return(
    <div>
    <StockChart
      data = {props.histPrice}
      ticker = {ticker}
      />
    {dataEntry}
  </div>
  )
}
export default MoreData;
