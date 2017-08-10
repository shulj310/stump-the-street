import React from 'react'
import { Icon, Card, Col, Row } from 'react-materialize'

const HowToPlay = props => {

  return(
  <div id="htpChild">
    <Row>
      <Col s={3}>
      </Col>
      <Col s={6}>
          <h2>How to Play</h2>
      </Col>
    </Row>
    <Row>
    <Col s={1}>
    </Col>
      <Col s={6}>
        <Card style={{background:"#37474F",color:"white"}}>
          <div className="left-align" >
            <h4>
            <i className="small material-icons">class</i>Build Your Competition
            </h4>
            <div>
            <img
              src={require(`./../../../../assets/images/showCompetition.png`)}
              width={"80%"}
              height={"80%"}
              style={{ boxShadow:"0px 0px 3px #888888", borderRadius:"5px"}}
            />
            </div>
          </div>
          <label style={{fontSize:"150%",color:"white"}}>
            Each competitor has a <a href="#">different strategy</a> and every deadline has a unique payout, so choose wisely!
          </label>
        </Card>
      </Col>
    </Row>
      <Row>
        <Col s={3}>
        </Col>
        <Col s={6}>
          <Card style={{background:"#37474F",color:"white"}}>
            <div className="left-align">
              <h4>
              <i className="small material-icons">swap_vert</i>Trade Your Portfolio
              </h4>
              <img
                src={require(`./../../../../assets/images/buyStock.png`)}
                width={"80%"}
                height={"80%"}
                style={{ boxShadow:"0px 0px 3px #888888", borderRadius:"5px"}}
              />
            </div>
            <label style={{fontSize:"150%",color:"white"}}>
              Buy and sell stocks live and grow your $1,000,000 paper portfolio! You have until the end of the competition to best your oppoenent.
            </label>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col s={2}>
        </Col>
        <Col s={6}>
          <Card style={{background:"#37474F",color:"white"}}>
            <div className="left-align">
              <h4>
              <i className="small material-icons">account_balance_wallet</i>Collect Your Winnings!
              </h4>
              <img
                src={require(`./../../../../assets/images/buyStock.png`)}
                width={"100%"}
                height={"100%"}
              />
            </div>
            <label style={{fontSize:"150%",color:"white"}}>
              If you have a better return than your competitor after your competition ends, time to celebrate!
            </label>
          </Card>
        </Col>
      </Row>
  </div>
  )
}

export default HowToPlay
