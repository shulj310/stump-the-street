import React, { Component } from 'react'
import { Col,Row,Chip,Tag } from 'react-materialize'
import TextField from '../../components/TextField'
import Table from './Table'
import Header from './Header'
import AutosuggestInput from '../containers/AutosuggestInput'
import { compareTickerData } from '../utils/compareData'


const ShowCard = props =>{

    let ticker,
    stockObject,
    data,
    showData=[],
    headers = [],
    industryData,
    showIndustryData = [],
    compareData=[],
    chips
    if ((Object.keys(props.data).length !== 0) && Object.keys(props.industryData !== 0) && (Object.keys(props.compareData !== 0))){
      compareData = compareTickerData(props.compareData)
      industryData = props.industryData
      stockObject = props.stockObject
      data = props.data
      ticker = Object.keys(data)[0]
      Object.values(data)[0].forEach((field,index)=>{
        if (Object.keys(field)[0]!="SIC"){
        headers.push(Object.keys(field)[0])
        showData.push(Object.values(field)[0][0])
        }
      })
      Object.values(industryData)[0].forEach((field,index)=>{
        showIndustryData.push(Object.values(field)[0][0])
      })
      headers.unshift("Ticker")
      showData.unshift(ticker)
      showIndustryData.unshift("Industry")
      chips = props.tags.map((tag,index)=>{
          if (tag !=='sic'){
          return(
            <Chip
              key={index}
              style={{padding:0,margin:0}}
              >
              <Row>
                <Col s={1}>
                  <button style={{padding:"0px",margin:"0px",borderRadius:"5px",background:"transparent",
                    border:"transparent"}}>
                      <i className="material-icons"
                        style={{fontSize:"90%"}}
                        id={tag}
                        onClick={props.removeField}>clear</i>
                    </button>
                </Col>
                <Col s={8}>
                  <label style={{fontSize:"75%"}}>
                    {tag}
                  </label>
                </Col>
              </Row>
            </Chip>
          )
        }
      })
    }

    return(
    <div style={{boxShadow:"0px 0px 3px #888888", borderRadius:"5px",background:"white",paddingLeft:"8px"}}>
      <Row style={{margin:0}}>
        <Col s={4}>
          <input type="text"
            name="ticker"
            onChange={props.handlerFunction}
            value={props.content}
            placeholder="Enter Ticker"
            style={{marginBottom:0}}
          />
        </Col>
        <Col s={2}>
        <button style={{marginTop:"20px",borderRadius:"5px",background:"transparent",
          border:"transparent"}}>
          <i className="material-icons"
            onClick={props.search}>search</i>
          </button>
        </Col>
        <Col s={4}>
          <div style={{marginTop:"25px"}}>
            <label style={{fontSize:"100%"}}>Shares: {props.shares}</label>
          </div>
        </Col>
        <Col s={2}>
          <div>
            <button style={{marginTop:"20px",lineHeight:"20px",borderRadius:"5px",background:"transparent",
              borderColor:"#888888",display:"inline-block"}}>Trade</button>
          </div>
        </Col>
      </Row>
      <Row style={{marginTop:"2px"}}>
        <Col s={7}>
          {chips}
        </Col>
        <Col s={1}>
        <button style={{height:"20px",borderRadius:"5px",background:"transparent",
          border:"transparent"}}
          onClick={props.newFieldHandler}>
            <i className="material-icons" style={{height:"20px",marginBottom:"0px",padding:0}}>add_box</i>
          </button>
        </Col>
        <Col s={4}>
        <AutosuggestInput
          fillData={props.fillData}
          newFieldHandler={props.newFieldHandler}
          name="newField"
          value={props.newFieldContent}
          onChange={props.handlerFunction}
          placeholder="  New Field"
        />
        </Col>
      </Row>
      <Row>
        <Col s={10}>
          <Header
          ticker={ticker}
            data = {props.header}
          />
        </Col>
      </Row>
      <Row>
        <Table
          removeTicker={props.removeTicker}
          compareData={compareData}
          headers={headers}
          showData={showData}
          industryData={showIndustryData}
          compare={props.compare}
          compareContent={props.compareContent}
          onChange={props.handlerFunction}
        />
      </Row>
    </div>
    )
  }
export default ShowCard

// <Col s={4}>
//   <input style={{maxWidth:"110px",fontSize:"80%",marginBottom:0,height:"25px",borderRadius:"5px",
//   borderColor:"#888888",borderStyle:"solid",borderWidth:"1px"}}
//     name="newField"
//     value={props.newFieldContent}
//     onChange={props.handlerFunction}
//     placeholder="  New Field"
//   />
