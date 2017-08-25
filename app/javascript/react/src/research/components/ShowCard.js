import React, { Component } from 'react'
import { Col,Row,Chip,Tag,Modal } from 'react-materialize'
import TextField from '../../components/TextField'
import Table from './Table'
import Header from './Header'
import AutosuggestInput from '../containers/AutosuggestInput'
import { compareTickerData } from '../utils/compareData'
import { retrieveData } from '../utils/retrieveData'
import { headerData } from '../utils/headerData'
import AvailableFields from './availableFields'
import Clickable from './clickable'


const ShowCard = props =>{

    let ticker = props.ticker
    let chips

    let industryData = retrieveData(props.industryData,"Industry")
    let showData = retrieveData(props.data,ticker)
    let headers = headerData(props.data)
    let compareData = compareTickerData(props.compareData)

      if (showData.length !== 0){
      chips = props.tags.map((tag,index)=>{
          if (tag !=='sic'){
          return(
            <Clickable
              key={index}
              index={props.index}
              removeField={props.removeField}
              tag={tag}
            />
          )
        }
      })}

    let searchNewField,
    table

    if (props.showTable){

          searchNewField =

          <Row style={{marginTop:"2px",marginBottom:0,paddingBottom:0}}>
            <Col s={7}>
              {chips}
            </Col>
            <Col s={5}
              style={{paddingBotton:0}}>
              <Row>
                <Col s={2}>
                  <Modal
                    header="Available Fields"
                    trigger={<a href="#"><i className="material-icons">info</i></a>}>
                      <AvailableFields
                        currentField = {props.newField}
                        fillData = {props.fillData}
                      />
                  </Modal>

                </Col>
                <Col s={10}>
                  <AutosuggestInput
                    newFieldHandler={props.newFieldHandler}
                    fillData={props.fillData}
                    newFieldHandler={props.newFieldHandler}
                    name="newField"
                    value={props.newFieldContent}
                    onChange={props.handlerFunction}
                    placeholder=" Add field..."
                  />
                </Col>
              </Row>
            </Col>
          </Row>

     table =

          <Row>
            <Table
              removeTicker={props.removeTicker}
              compareData={compareData}
              headers={headers}
              showData={showData}
              industryData={industryData}
              compare={props.compare}
              compareContent={props.compareContent}
              onChange={props.handlerFunction}
            />
          </Row>
    } else{

      table= <br/>
    }


    return(
    <div style={{boxShadow:"0px 0px 3px #888888", borderRadius:"5px",background:"white",paddingLeft:"8px"}}>
      <Row style={{margin:0}}>
        <Col s={4}>
          <form onSubmit={props.search}>
            <input type="text"
              name="ticker"
              onChange={props.handlerFunction}
              value={props.content}
              placeholder="Enter Ticker"
              style={{marginBottom:0,fontColor:"#37474F"}}
            />
          </form>
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
      {searchNewField}
      {table}
    </div>
    )
  }

export default ShowCard
