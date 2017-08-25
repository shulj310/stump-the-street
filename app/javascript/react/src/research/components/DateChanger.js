import React from 'react'

const DateChanger = props =>{

  return(
    <div>
      <span onClick={props.changeDate} id="30">1 Month</span>
      <span onClick={props.changeDate} id="90">3 Month</span>
      <span onClick={props.changeDate} id="180">6 Month</span>
      <span onClick={props.changeDate} id="360">12 Months</span>
      <span onClick={props.changeDate} id="720">2 Year</span>
    </div>
  )
}
export default DateChanger
