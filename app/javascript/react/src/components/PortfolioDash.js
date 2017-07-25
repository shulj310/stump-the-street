import React from 'react';

const PortfolioDash = (props) => {

  let deadline;

  if (props.portfolio.competition){
    deadline = (props.portfolio.competition.deadline)
    var n = date.toDateString();
    var time = date.toLocaleTimeString();
    console.log(props.portfolio.competition)

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
