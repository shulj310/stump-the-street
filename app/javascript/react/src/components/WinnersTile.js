import React from 'react'
import { Chip, Row, Col, Card } from 'react-materialize'
import WinnerCard from './WinnerCard'


const WinnersTile = props => {
  return(

  <div>
    <WinnerCard
      src={"https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAydAAAAJDliMDYxNTRhLTM3MTctNDZiNi05NmMzLTk1MTEyYWYyNDg3NQ.jpg"}
      name={"Geroge G."}
      label={"Stumped Cramer to win $500!"}
    />
    <Row>
      <Col s={6}>
      </Col>
      <Col s={5}>
        <Card
          style={{borderRadius:"30px",maxHeight:120,
          background: "repeating-linear-gradient( 135deg, #d3d6ed, #daddef 10px, #e3e5f2 10px, #c5c9e0 20px)"}}>
          <Row>
            <Col s={6}>
              <label style={{fontSize:"100%",color:"black"}}>
                <strong>Stumped the Pros to win $200!</strong>
              </label>
            </Col>
            <Col s={1}>
            </Col>
            <Col s={5}>
              <img
              src='https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAl0AAAAJDk1MmFmZmIyLTk4YmItNDk4Ny04NTdlLWViNzA4MjYzNTdlMg.jpg'
              alt='Contact Person'
              style={{borderRadius:"50%",boxShadow:"0px 0px 5px #888888"}}
              width={"110%"}
              height={"110%"}
               />
               <label style={{fontSize:"90%",color:"black"}}>
               Helen D.</label>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <WinnerCard
      src={"https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/8/000/268/053/310a2ce.jpg"}
      name={"Gino I."}
      label={"Beat the Market to win $350!"}

    />
  </div>
  )
}

export default WinnersTile
