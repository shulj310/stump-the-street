import React from 'react';
import { Table, Col, Row, CardPanel, Modal, Button, Icon } from 'react-materialize'
import numeral from 'numeral'
import {competitorDictionary} from '../utils/competitorDictionary'
import { Link } from 'react-router-dom';

const PortfolioDash = (props) => {

  let d,
  date,
  comp,
  user,
  name,
  daysLeft,
  msDay = 60*60*24*1000,
  colorClass

  if (props.portfolio.deadline)

  {d = new Date(props.portfolio.deadline)
  daysLeft = (Math.floor((d - new Date()) / msDay))
  if (daysLeft < 5){
    colorClass="red darken-4 text-days"
  } else {
    colorClass="light-blue darken-1 text-days"
  }
  date = String(d).split(" ").slice(0,4).join(" ")

  name = competitorDictionary[props.portfolio.competitor_id]

  comp = <img
    src={require(`./../../../../assets/images/${name}.png`)}
    width={75}
    height={75}
    alt={name}
    className="circle z-depth-5"
  />

  }


  let gainClass;
  let compClass;
  let diffClass

  if (props.portfolio.return > 0)
    {gainClass = " gain-value v-green"} else {
    gainClass = 'gain-value v-red'
    }

    if (props.portfolio.comp_return > 0){
      compClass = " gain-value v-green"} else {
      compClass = 'gain-value v-red'
    }
    if (props.portfolio.diff > 0){
      diffClass = " gain-value v-green"} else {
      diffClass = 'gain-value v-red'
    }


  return(

    <div>
    <br/>
    <Row>
    <Col s={11}>
      <h6><Link to={`/competitions/`}>
      My Portfolios</Link> / {props.portfolio.name}</h6>
      <hr/>
      <Row>
        <Col s={4}>

          <h4>{numeral(props.portfolio.value).format('$0,0.00')}</h4>
          <div className="left-align">
            <p className="gain-value">Total Cash<br/>
            <span className="gain-value">
              {numeral(props.portfolio.cash).format('$0,0.00')}
              </span>
            </p>
          </div>
        </Col>
        <Col s={3}>
          <div className="left-align">
            <p className="gain-value">Total Gain<br/>
            <span className={gainClass}>
              {numeral(props.portfolio.value-1000000).format('$0,0.00')}
              ({numeral(props.portfolio.return).format('0.00%')})
              </span>
            </p>
          </div>
        </Col>
        <Col s={2}>
          <div className="left-align">
            <p className="gain-value comp-text">{name} Gain<br/>
            <span className={compClass}>
              ({numeral(props.portfolio.comp_return).format('0.00%')})
              </span>
            </p>
          </div>
        </Col>
        <Col s={2}>
          <div className="left-align">
            <p className="gain-value center-align">+/-<br/>
            <span className={diffClass}>
              ({numeral(props.portfolio.diff).format('0.00%')})
              </span>
            </p>
          </div>
        </Col>
      </Row>
    </Col>

    <Col s={1}>
    <span>
    <Modal
      header='Competition Details'
      trigger={
        <a
        className="indigo darken-3 btn-floating btn-large">
        <Icon
          large={true}>assignment</Icon></a>
      }>
      <p>This competition will end on {date}</p><hr/><p>You have {daysLeft} until the competition is complete!</p>
    </Modal>
    </span>
    </Col>
    </Row>
    </div>

  )
}

export default PortfolioDash
