import React from 'react'

const HowToPlay = props =>{

  return(
    <div>
      <div style={{backgroundColor:"#311B92",maxWidth:"35vw"}}>
        <h1
          style={{fontSize:"4.5vw",paddingLeft:"4vw",paddingTop:"0.5vw",paddingBottom:"0.5vw",paddingRight:"1vw"}}>How to Play</h1>
      </div>
      <div style={{maxWidth:"90vw",paddingLeft:"1vw"}}>
        <p className="copy">
        <img style={{float:"left",margin:"-0.5em 2vw 1vw 0",height:"auto",width:"auto",paddingLeft:"3vw",maxWidth:"25%"}}
          src={require(`./../../../../assets/images/stump_homepage_icon_group.png`)}
        />
          Stump the Street is where new investors and seasoned pros come to challenge their peers and walk away with prizes. Build your own winning portfolios and watch your Global Rank soar.
        </p>
      </div>
    </div>
  )
}

export default HowToPlay
