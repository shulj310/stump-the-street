import React from 'react'
import {Row,Col} from 'react-materialize'

const Table = props => {

let showHeaders = []
let showData = []
let industryData,
compareData

  if ((props.headers != undefined) && (props.showData != undefined)){
    showHeaders = props.headers
    showData = props.showData
    industryData = props.industryData
    compareData = props.compareData
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

  let industry = industryData.map((field,index)=>{
    if ((index<5)){
  return(
      <td key={index}>{field}</td>
    )
  }
  })

  let compare = compareData.map((stock,i)=>{
    let data = stock.map((field,index)=>{
      if ((index<5)){
        if(index==0){
          return(
            <td key={index}>
            <button style={{padding:"0px",margin:"0px",borderRadius:"5px",background:"transparent",
              border:"transparent"}}>
                <i className="material-icons"
                  style={{fontSize:"90%",fontColor:"red"}}
                  id={field}
                  onClick={props.removeTicker}>clear</i>
              </button>{field}
            </td>
          )
        } else{
        return(
          <td key={index}>{field}</td>
        )
      }
    }
    })
    return(
      <tr key={i}>
        {data}
      </tr>
    )
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
              {industry}
            </tr>
            <tr>
              {data}
            </tr>
            {compare}
            <tr>
              <td>
              <form onSubmit={props.compare}>
                <input
                  name="compareTicker"
                  value={props.compareContent}
                  onChange={props.onChange}
                  onSubmit={props.compare}
                  placeholder="Compare Stock"
                />
              </form>
              </td>
            </tr>
          </tbody>
        </table>
      </Col>
    </Row>
  </div>

  )
}

export default Table
