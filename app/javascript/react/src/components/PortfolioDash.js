import React from 'react';

const PortfolioDash = (props) => {

  let deadline;

  if (props.portfolio.competition){
    deadline = (props.portfolio.competition.deadline)
    deadline = Date(deadline).split(" ").slice(0,4).join(" ")
    debugger;
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
        <td>{props.portfolio.value} </td>
        <td>{props.portfolio.cash} </td>
        <td>{props.portfolio.return} </td>
      </tbody>
      </table>
    </div>

  )
}

export default PortfolioDash
