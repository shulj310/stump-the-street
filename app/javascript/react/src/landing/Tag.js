import React from 'react'

const Tag = props =>{

  return(
    <div style={{position:"relative"}}>
      <div style={{position:"relative"}}>
        <div style={{position:"absolute",
                    zIndex:1,
                    fontWeight:"2000",
                    left:5,
                    padding:0,
                    margin:0,
                    border:0}}>
          <h1
            style={{fontSize:"6vw",padding:0,margin:0}}>Build your portfolio.</h1>
          <h1
            style={{fontSize:"6vw",padding:0,margin:0}}>Challenge the world.</h1>
          <h1
          style={{fontSize:"6vw",padding:0,margin:0}}>Collect your prizes.</h1>
        </div>
        <div
          style={{position:"absolute",
                  top:-50,
                  left:-10}}>
        <img
          className="graph-img"
          src={require(`./../../../../assets/images/stump_homepage_graph.png`)}
        />
        </div>
      </div>
    </div>
  )
}

export default Tag
