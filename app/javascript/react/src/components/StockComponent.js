import React from 'react';

const StockComponenet = props => {
  return (
<div>
  {props.stock.stock.ticker} | {props.stock.shares} | {props.stock.stock.price}
</div>
  );
}

export default StockComponenet;
