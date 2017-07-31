import React from "react";

const CompetitionComponent = (props) =>{
  return(
    <div>
    <h2> Competition Details </h2>
     <h4>Compeition Length: {props.competition.length} |
      Competion Deadline: {props.competition.deadline}
    </h4>
    </div>
  )
}

export default CompetitionComponent
