import React from 'react';

const StockComponenet = props => {
  let value = Number(props.stock.value).toFixed(2)
  let price_return = Number(props.stock.price/props.stock.cost-1).toFixed(2)
  return (
    <tr>
      <td>{props.stock.ticker}</td>
      <td>{props.stock.shares}</td>
      <td>{value}</td>
      <td>{props.stock.price}</td>
      <td>{Number(props.stock.cost).toFixed(2)}</td>
      <td>{price_return}</td>
    </tr>
  );
}

export default StockComponenet;
