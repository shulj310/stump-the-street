import React from 'react';
import numeral from 'numeral'

const PortfolioDash = (props) => {

  let deadline;
  let portReturn;

  if (props.portfolio.return){
    portReturn = numeral(props.portfolio.value/1000000).format('0.00%')
  }

  if (props.portfolio.competition){
    deadline = (props.portfolio.competition.deadline)
    deadline = Date(deadline).split(" ").slice(0,4).join(" ")
  }
  return(

    <div>
      <h4>Strategy Name: {props.portfolio.name}</h4>
      <h5>Deadline: {deadline}</h5>
      <table className="striped centered">
      <tbody>
      <tr>
        <th>Current Market Value </th>
        <th>Cash </th>
        <th>Return </th>
      </tr>
        <td>{numeral(props.portfolio.value).format('$0,0.00')} </td>
        <td>{numeral(props.portfolio.cash).format('$0,0.00')} </td>
        <td>{numeral(props.portfolio.value/1000000-1).format('0.00%')} </td>
      </tbody>
      </table>
    </div>

  )
}

export default PortfolioDash
