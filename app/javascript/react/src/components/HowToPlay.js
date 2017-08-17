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
            Each competitor has a <a href="/competitors">different strategy</a> and every deadline has a unique payout, so choose wisely.
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
              Buy and sell stocks live and grow your $1,000,000 paper portfolio. Make as many trades as you want... they are FREE!
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
                src={require(`./../../../../assets/images/showWinner.png`)}
                width={"80%"}
                height={"80%"}
                style={{ boxShadow:"0px 0px 3px #888888", borderRadius:"5px"}}
              />
            </div>
            <label style={{fontSize:"150%",color:"white"}}>
              Get paid in real cash at the end of your competition. Just have a better portfolio return.
            </label>
          </Card>
        </Col>
      </Row>
  </div>
  )
}

export default HowToPlay
