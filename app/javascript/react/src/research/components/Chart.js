import React from 'react'
import {Line,Bar} from "react-chartjs-2"
import numeral from 'numeral'
import DateChanger from './DateChanger'
import RelativeChanger from './RelativeChanger'
import { Row,Col } from 'react-materialize'



const Chart = props =>{

  let graph

  if (props.chartData !== {}){
      graph =
      <Line
          data={props.chartData}
          height={800}
          width={1600}
          options={{maintainAspectRatio:true}}
        />
    }

  return(
    <div style={{boxShadow:"0px 0px 3px #888888", borderRadius:"5px",background:"white",padding:"8px"}}>
      <div style={{position:"relative",display:"inline-block",top:-7}}>
        <DateChanger
          content={props.content}
          changeDate={props.changeDate}
        />
      </div>
      <div style={{position:"relative",display:"inline-block"}}>
        <RelativeChanger
          changeRelative={props.changeRelative}
          content={props.relContent}
        />
      </div>
      <div>
        {graph}
      </div>
    </div>
  )
}

export default Chart
