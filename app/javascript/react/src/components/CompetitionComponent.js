import React from "react";
import {Icon} from 'react-materialize'
import numeral from 'numeral'

const CompetitionComponent = (props) =>{

  let src,
  comp,
  performance,
  a_b,
  diff,
  wager_amount

  if (props.name != undefined){
    comp = <img
      src= {require(`./../../../../assets/images/${props.name}.png`)}
      width={100}
      height={100}
      alt={name}
      className="z-depth-3 img-comp"
    />
    diff = numeral(props.diff).format('0.00%')
    wager_amount = numeral(props.wager_amount).format('$0,0.00')
  }

  if ((props.diff != undefined) && (props.diff >0)){
    performance="trending_up"
    a_b = "ahead"
  } else{
    performance="trending_down"
    a_b = "behind"
  }

  return(
    <div className="comp-box">
    {comp}
      <div className="comp-data">
        <Icon>access_alarm</Icon><span className="text-pos"> You have {props.daysLeft} days until the competition is complete</span>
      </div>
      <div className="comp-data">
        <Icon>casino</Icon><span className="text-pos">You have wagered {wager_amount} on this competition</span>
      </div>
      <div className="comp-data">
        <Icon>{performance}</Icon><span className="text-pos">You are currently {a_b} by {diff}</span>
      </div>
    </div> )
}

export default CompetitionComponent
