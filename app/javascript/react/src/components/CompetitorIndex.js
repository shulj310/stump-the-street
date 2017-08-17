import React from 'react'
import { Col, Row, Modal } from 'react-materialize'
import Odds from './Odds'

const CompetitorIndex = props =>{

  return(
    <div>
      <div style={{position:"fixed",left:30}}>
        <Modal
          header='Odds'
          trigger={<button type='button' className= "btn-large  red" style={{fontSize:"130%"}}>Odds</button>}>
          <Odds
          />
        </Modal>
      </div>
      <div className="center-align" style={{background:"#eceff1",paddingRight: "2%",paddingLeft:"2%",paddingBottom:"2%",boxShadow:"2px 2px 2px 1px rgba(0, 0, 0, 0.2)"}}>
        <h1>Your Competitors</h1>
        <hr/>
      </div>
      <div style={{background:"#eceff1",borderRadius:"5px",padding:"0% 2%",boxShadow:"2px 2px 2px 1px rgba(0, 0, 0, 0.2)"}}>
      <Row>
        <Col s={5}>
          <img
          src={require(`./../../../../assets/images/justCramer.svg`)}
          alt="cramer"/>
        </Col>
        <Col s={7}>
          <div style={{paddingTop:"50px"}}>
            <h6 style={{fontSize:"120%"}}>
              <strong>Jim Cramer</strong> is the host of CNBC's Mad Money, founder of the Street.com, and famed Hedge Fund Manager with
              one of the most prolific track records in the industry's history. <br/><br/>But, he is not always right! Although the portfolio
              he manages is available to the public, it has not been proven to beat the market year over year. Instead of paying
              to see his trades, make your own trades to take him down! <br/><br/>Selecting Cramer will put you head to head directly against his
              live portfolio strategy! Do you have what it takes to stump<a href="/competitions"> Cramer?</a>
            </h6>
          </div>
        </Col>
        </Row>
      </div>
      <div style={{background:"#eceff1",borderRadius:"5px",padding:"0% 2%",boxShadow:"2px 2px 2px 1px rgba(0, 0, 0, 0.2)"}}>
        <Row>
          <Col s={7}>
          <div style={{paddingTop:"50px"}}>
            <h6 style={{fontSize:"120%"}}>
              Mutual Fund investors have consistently proven incapable of outperforming the market. Vanguard, Fidelity, and other
              giants are ditching "active" managers in favor of index funds. <br/><br/>
              Why pay high fees for these funds when you can beat the very managers that collect your money? Without paying ANY trading costs,
              you are already one step ahead of the game! <br/><br/>
              Selecting the Bull will take you into a head on battle against an index of Mutual Fund managers!
              Do you have what it takes to stump the <a href="/competitions">Bull?</a>
            </h6>
          </div>
          </Col>
          <Col s={5}>
            <img
            src={require(`./../../../../assets/images/justBull.svg`)}
            alt="bull"/>
          </Col>
        </Row>
      </div>
      <div style={{background:"#eceff1",borderRadius:"5px",padding:"0% 2%",boxShadow:"2px 2px 2px 1px rgba(0, 0, 0, 0.2)"}}>
        <Row>
          <Col s={6}>
            <img
            src={require(`./../../../../assets/images/justStreet.svg`)}
            alt="street"/>
          </Col>
          <Col s={6}>
            <div style={{paddingTop:"50px"}}>
              <h6 style={{fontSize:"120%"}}>
                The biggest challenges in outperforming the stock market are not having enough funds to diversify and piling up trading costs.
                <br/><br/>Stump the Street has your back! With a $1,000,000 portfolio to properly spread out stock risk and unlimited free
                trades, the opportunity to beat the market has never been better!
                <br/><br/>Selecting the Market puts you mano y mano with the S&P 500 index and offers a chance to outperfom the market, and get paid!
                Do you have what it takes to stump the <a href="/competitions">Market?</a>
              </h6>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default CompetitorIndex
