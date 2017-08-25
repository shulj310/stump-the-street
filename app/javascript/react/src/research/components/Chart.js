import React from 'react'
import {Line,Bar} from "react-chartjs-2"
import numeral from 'numeral'
import DateChanger from './DateChanger'



const Chart = props =>{

  let graph

  if (props.chartData !== {}){
    graph =
        <Line
          data={props.chartData}
          height={350}
          width={400}
          options={{maintainAspectRatio:true}}
        />

  }

  return(
    <div style={{boxShadow:"0px 0px 3px #888888", borderRadius:"5px",background:"white",padding:"8px"}}>
      <DateChanger
        content={props.content}
        changeDate={props.changeDate}
      />
      {graph}
    </div>
  )
}

export default Chart
