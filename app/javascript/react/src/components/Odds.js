import React from 'react'
import {oddsDictionary} from '../utils/oddsDictionary'
import numeral from 'numeral'

const Odds = props =>{


  let tableBody = Object.values(oddsDictionary).map((odd)=>{

    let timeLine = odd[0]
    let payOut = odd[2]
    let odds = odd[1]

    return(
    <tr>
      <td>{timeLine}</td>
      <td>{numeral(payOut*100).format('$0,0.00')}</td>
      <td>{odds}</td>
    </tr>

  )

  })


  return(
  <div>
    <table>
        <thead>
          <tr>
            <th>Time Period</th>
            <th>Return on $100</th>
            <th>*Odds</th>
          </tr>
        </thead>
      <tbody>
        {tableBody}
      </tbody>
    </table>
    <label>
      Odds are calculated gross of 5% service fee.
    </label>
  </div>
  )
}

export default Odds
