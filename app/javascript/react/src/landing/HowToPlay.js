import React from 'react'

const HowToPlay = props =>{

  return(
    <div>
      <div style={{backgroundColor:"#311B92",maxWidth:"25vw"}}>
        <h1
          style={{fontSize:"3vw",paddingLeft:"4vw",paddingTop:"0.5vw",paddingBottom:"0.5vw",paddingRight:"1vw"}}>How to Play</h1>
      </div>
      <div style={{maxWidth:"70vw",paddingLeft:"1vw"}}>
        <p style={{color:"black",fontSize:"2vw"}}>
        <img style={{float:"left",margin:"-0.5em 2vw 1vw 0",height:"auto",width:"auto",paddingLeft:"3vw",maxWidth:"25%"}}
          src={require(`./../../../../assets/images/stump_homepage_icon_group.png`)}
        />
          Stump the Street is where new investors and seasoned pros come to challenge their peers and walk away with prizes. Create your own winning strategies and watch as your Investor Rank soars.
        </p>
      </div>
    </div>
  )
}

export default HowToPlay
