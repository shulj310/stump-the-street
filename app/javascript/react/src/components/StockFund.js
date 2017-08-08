import React from 'react'

const StockFund = props =>{

  return(
  <div className="data-container">
    <div className="data-table-label">
      {props.label}
    </div>
    <div className="data-table-value">
      {props.value}
    </div>
  </div>
  )
}

export default StockFund
