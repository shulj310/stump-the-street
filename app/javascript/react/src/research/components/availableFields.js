import React from 'react'
import {nameToTag} from '../utils/nameToTag'
import { linkBuilder } from '../utils/investopediaLink'

const AvailableFields = props =>{

  let avails = Object.keys(nameToTag)

  let showAvails = avails.map((field,index)=>{

    let fieldArray = nameToTag[field]
    let link = linkBuilder(fieldArray[2])

    return(
      <tr key={index} className="center-align">
        <td>
          <button style={{padding:"0px",margin:"0px",borderRadius:"5px",background:"transparent",
            border:"transparent"}}>
              <i className="material-icons"
                style={{fontSize:"80%"}}
                id={field}
                onClick={props.fillData}>add_circle_outline</i>
            </button>
          <a href={link} target="_blank"
            style={{display:'inline-block',paddingLeft:"2px",paddingRight:"2px"}}>
            {field}
          </a>
        </td>
        <td>
          {fieldArray[1]}
        </td>
      </tr>
    )
  })

  return(

    <div>
      <table>
        <thead>
          <tr>
            <td>Field Name</td>
            <td>Short Description</td>
          </tr>
        </thead>
        <tbody>
          {showAvails}
        </tbody>
      </table>
    </div>
  )
}

export default AvailableFields
