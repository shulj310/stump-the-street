import React from 'react'
import {Row,Col} from 'react-materialize'
import { formatDictionary } from '../utils/formatDictionary'

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
      return(
          <th key={index}
            style={{fontSize:"90%",paddingTop:3,paddingBottom:3}}>{field}</th>
      )
  })

  let data = showData.map((field,index)=>{

        let newField = field

        if (Array.isArray(field)){

        newField = formatDictionary(field[0],field[1])
      }
    return(
        <td key={index}
          style={{fontSize:"85%",paddingTop:3,paddingBottom:3,marginBottom:1}}>{newField}</td>
      )
  })

  let industry = industryData.map((field,index)=>{
      let newIndustryField = field

      if (Array.isArray(field)){

      newIndustryField = formatDictionary(field[0],field[1])
    }
  return(
      <td key={index}
        style={{fontSize:"80%",paddingTop:3,paddingBottom:3}}>{newIndustryField}</td>
    )
  })

  let compare = compareData.map((stock,i)=>{
    let data = stock.map((field,index)=>{
        if(index==0){
          return(
            <td key={index}
              style={{fontSize:"80%",paddingTop:3,paddingBottom:3}}>
            <button style={{padding:"0px",margin:"0px",borderRadius:"5px",background:"transparent",
              border:"transparent"}}>
                <i className="material-icons"
                  style={{fontSize:"85%",fontColor:"red"}}
                  id={field}
                  onClick={props.removeTicker}>clear</i>
              </button>{field}
            </td>
          )
        } else{
          let newCompareField = field

          if (Array.isArray(field)){

            newCompareField = formatDictionary(field[0],field[1])
          }
        return(
          <td key={index}
            style={{fontSize:"80%",paddingTop:3,paddingBottom:3}}>{newCompareField}</td>
        )
      }
    })
    return(
      <tr key={i}
        style={{backgroundColor:"#FFFDFF",padding:0,marginTop:1}}>
        {data}
      </tr>
    )
  })



  return(

  <div className="center-align">
    <Row>
      <Col s={1}>
      </Col>
      <Col s={10}>
        <div style={{overflowX:"auto"}}>
          <table
            style={{boxShawow:"1px 0px 3px #FAFAFA",borderRadius:"5px"}}>
            <thead>
              <tr
                style={{backgroundColor:"#FAFAFA", fontStyle:"bold",padding:0}}>
                {headers}
              </tr>
            </thead>
            <tbody>
              <tr
                style={{backgroundColor:"#FFFDFF", fontStyle:"italic",padding:0}}>
                {industry}
              </tr>
              <tr
                style={{backgroundColor:"#FAFAFA",padding:0,zIndex:1,boxShadow:"1px 0px 3px #888888"}}>
                {data}
              </tr>
              {compare}
              <tr
                style={{padding:0,margin:0}}>
                <td
                  style={{padding:0,margin:0}}>
                <form onSubmit={props.compare}>
                  <div style={{position:"absolute"}}>
                      <i className="material-icons" style={{fontSize:"80%"}}
                      onClick={props.compare}>add</i>
                  </div>
                  <div style={{position:"relative",left:10}}>
                    <input
                      name="compareTicker"
                      value={props.compareContent}
                      onChange={props.onChange}
                      onSubmit={props.compare}
                      placeholder=" Add ticker..."
                      style={{
                        padding:0,
                        fontSize:"85%",
                        maxWidth:"75px",
                        minWidth:"75px",
                        borderBottom:'none',
                        maxHeight:"25px",
                        fontStyle:"italic",
                        margin:0,
                        zIndex:100
                      }}
                      className="add-field"
                    />
                  </div>
                </form>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Col>
      <Col s={1}>
      </Col>
    </Row>
  </div>

  )
}

export default Table
