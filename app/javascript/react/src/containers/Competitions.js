import React, { Component } from 'react';
import CompetitionComponent from '../components/CompetitionComponent'
import CompetitionForm from './CompetitionForm'

class Competitions extends Component{
  constructor(props){
  super(props)
  this.state = {
    competitions: []
  }
  this.addCompetition = this.addCompetition.bind(this)
}

  componentDidMount(){
    fetch('/api/v1/competitions')
    .then(response => response.json())
    .then(body =>{
      this.setState({ competitions: body})
    })
  }


  addCompetition(payLoad){
    fetch('/api/v1/competitions', {
      method: "POST",
      body: JSON.stringify(payLoad)
    }).then(response =>{
      let body = response.json()
      return body
    }).then(body=>{
      let newComps = this.state.competitions.slice()
      newComps.unshift(body)
      this.setState({competitions: newComps})
    })
  }

  render (){

    let competitions = this.state.competitions.map( (competition,index) =>{
      console.log(competition)
      return(
        <CompetitionComponent
          key= {index}
          competition = {competition}
        />
      )
    })
    return(
        <div>
          {competitions}
          <CompetitionForm
            addCompetition = {this.addCompetition}
            />
        </div>
    )
  }
}

export default Competitions;
