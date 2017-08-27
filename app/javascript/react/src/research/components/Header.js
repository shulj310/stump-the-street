import React from 'react'
import numeral from 'numeral'

const Header = props => {

  let marketCap,
  name,
  price,
  sector

  if ((props.data != "")&& (props.ticker != undefined)){
    let object = props.data[props.ticker]
    marketCap = `Mkt Cap: ${numeral(Object.values(object.filter(ob => Object.keys(ob) == "Market Capitalization")[0])[0]).format("$0,0.00")}`
    name = Object.values(object.filter(ob => Object.keys(ob) == "Company Name")[0])[0]
    price = numeral(Object.values(object.filter(ob => Object.keys(ob) == "Last Price")[0])[0]).format("$0,0.00")
    sector = Object.values(object.filter(ob => Object.keys(ob) == "Sector")[0])[0]
}
  return(
    <div>
      <h5>{name}<label> {price}</label></h5>
      <label>{marketCap} </label><label> {sector} </label>
    </div>
  )
}

export default Header
