import React from 'react'
import {Row,Col} from 'react-materialize'

const Table = props => {

let showHeaders = []
let showData = []
  if ((props.headers != undefined) && (props.showData != undefined)){
    showHeaders = props.headers
    showData = props.showData
  }

  let headers = showHeaders.map((field,index)=>{
      if ((index<5)){
      return(
        <th key={index}>{field}</th>
      )
    }
  })

  let data = showData.map((field,index)=>{
      if ((index<5)){
    return(
      <td key={index}>{field}</td>
      )
    }
  })



  return(

  <div className="center-align">
    <Row>
      <Col s={12}>
        <table>
          <thead>
            <tr>
              {headers}
            </tr>
          </thead>
          <tbody>
            <tr>
              {data}
            </tr>
          </tbody>
        </table>
      </Col>
    </Row>
  </div>

  )
}

export default Table
