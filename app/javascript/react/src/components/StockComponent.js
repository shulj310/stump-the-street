import React from 'react';

const StockComponenet = props => {
  let value = props.stock.shares * props.stock.stock.price
  return (
  <div>
    <tr>
    {props.stock.stock.ticker} | {props.stock.shares}
    | {props.stock.stock.price} | {value}
  </div>
  );
}

export default StockComponenet;
