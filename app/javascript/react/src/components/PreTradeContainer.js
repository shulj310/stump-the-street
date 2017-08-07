import React from 'react';
import {CardPanel, Modal, Icon, Row} from 'react-materialize'
import MoreData from './MoreData'
import numeral from 'numeral'
// import MarketData from '../utils/MarketData'

const PreTradeContainer = props => {

  let data =
    <div className="no-sec">
      <p>No Security Loaded</p>
    </div>
  let ticker,
  shares,
  price,
  volume,
  high,
  low,
  percentageChange,
  value,
  name,
  open,
  close

    if (props.stockData){
      price = numeral(props.stockData.lastPrice).format('$0,0.00')
      volume = numeral(props.stockData.volume).format('0,0')
      high = numeral(props.stockData.high).format('$0,0.00')
      low = numeral(props.stockData.low).format('$0,0.00')
      percentageChange = numeral(props.stockData.percentChange/100).format('0.00%')
      open = numeral(props.stockData.open).format('$0,0.00')
      close = props.stockData.close
      if (close != 0){
      close = numeral(props.stockData.close).format('$0,0.00')}
      else{
        close = ""
      }
      name = props.stockData.name

    }

    if (props.ticker === ""){
      ticker = "Ticker"
    } else{
      ticker = props.ticker
    }

    if (props.shares === ""){
      shares = "# of Shares"
    } else{
      shares = numeral(props.shares).format('0,0')
    }

    if (props.stockData){
      value = numeral(props.stockData.lastPrice * props.shares).format('$0,0.00')
    }



    if (props.ticker !== "") {
      data = (
      <div>
      <div className="upper">
          <div className="name-data">{name}</div>
          <div className="value-data">{value}</div>
      </div>
      <div className="middle">
          <div className="ticker-data">{ticker}</div>
          <div className="price-data">{price}</div>
      </div>
      <div className="lower">
        <div className="show-data">Chng: {percentageChange}</div>
        <div className="show-data">Vol: {volume}</div>
        <div className="show-data">Open: {open}</div>
        <div className="show-data">Close: {close}</div>
        <div className="show-data">Hi: {high}</div>
        <div className="show-data">Lo: {low}</div>
      </div>
      </div>
      )
    }

    return(
      <div className="trade-container">
        <div className="modal-more">
          <div onClick = {props.fundDataHandler}>
          <Modal
          header='More Data'

          trigger={


          <a className="indigo darken-1 text-days btn-floating btn tooltipped">

          <Icon>assessment</Icon></a>}>
          <MoreData
            data = {props.fundData}
          />
          </Modal>
          </div>
        </div>
        {data}
      </div>
    )
  }

export default PreTradeContainer
