import React from 'react'
import { Table } from 'react-materialize'
import numeral from 'numeral';

const TradeQueue = props =>{

  let netValue = 0

  let trades = props.tradeQueue.map((trade)=>{
    let side = "sell"
    let marketValue = trade.stock.price * trade.shares
      if (trade.side){
        side = "buy"
        netValue -= marketValue
      } else{
        side = "sell"
        netValue += marketValue
      }

    return(
        <tr key={trade.id}>
          <td> {trade.stock.ticker} </td>
          <td> {side}</td>
          <td> {numeral(marketValue).format("$0,0.00")} </td>
          <td> {numeral(trade.shares).format("0,0")}</td>
          <td> {numeral(trade.stock.price).format('$0,0.00')}</td>
          <td> <button style={{color:"white",background:"red",border:"none",margin:"none",padding:"none"}} value={trade.id} onClick={props.cancelTrade}>Cancel</button> </td>
        </tr>
    )

  })

  return(
    <div>
    <h5>Estimated Cash Impact: {numeral(netValue).format("$0,0.00")} </h5>
    <Table
      hoverable={true}
      striped={true}>
      <thead>
        <tr>
          <td>Ticker</td>
          <td>Side</td>
          <td>Market Value</td>
          <td>Shares</td>
          <td>Price</td>
          <td>Cancel</td>
        </tr>
      </thead>
      <tbody>
        {trades}
      </tbody>
    </Table>
    </div>
  )
}

export default TradeQueue
