import React, { Component } from 'react';
import { Modal, Button, Icon } from 'react-materialize'
import CompetitionComponent from '../components/CompetitionComponent'
import CompetitionForm from './CompetitionForm'
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import numeral from 'numeral'
// import dateFormat from 'dateFormat'

class Competitions extends Component{
  constructor(props){
  super(props)
  this.state = {
    competitions: [],
    user_id: 0,
    newPort:0
  }
  this.addCompetition = this.addCompetition.bind(this)
  this.redirect = this.redirect.bind(this)
}

  componentDidMount(){
    fetch('/api/v1/competitions',{
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(body =>{

    // let competitions = body.map( (competition,index) =>{
    //   let details = {}
    //   details["id"] = competition.portfolio.id
    //   details["name"] = competition.portfolio.name
    //   details["deadline"] = competition.deadline
    //   details["return"] = competition.portfolio.return
    //   details["diff"] = competition.diff
    //   return details
    // })
    this.setState({competitions:body})
    })
  }

  redirect(id){
    document.location.replace(`/competitions/show/portfolios/${id}`)
  }

  addCompetition(payLoad){
    fetch('/api/v1/competitions/', {
      method: "POST",
      body: JSON.stringify(payLoad),
      credentials: 'same-origin'
    }).then(response =>{
      let body = response.json()
      return body
    }).then(body=>{
      this.redirect(body.portfolio.id)
    })
  }

  render (){

    let createPortfolioForm;

    if (this.state.showPortfolio) {
      createPortfolioForm = <Portfolio />
    }

    const columns = [{
        Header: 'Competition Info',
        columns: [{
          Header: 'Competition ID',
          accessor: 'id',
          Cell: props => <span>
            <Link to={`/competitions/show/portfolios/${props.value}`}>
            {props.value}</Link></span>
        }, {
          Header: 'Strategy Name',
          accessor: 'name',
          Cell: props => <span><strong>{props.value}</strong></span>
        }, {
          Header: 'Deadline',
          accessor: 'deadline',
          Cell: props=> <span>{String(new Date(
              props.value)).split(" ").slice(0,4).join(" ")}</span>
        }]
      }, {
        Header: 'Portfolio',
        columns: [{
          Header: 'Current Return',
          accessor: 'return',
          Cell: props => <span className='number'>
            {numeral(props.value).format('0.00%')}</span>},{
          Header: 'Competition Return',
          accessor: "comp_return",
          Cell: props=> <span className='number'>
          {numeral(props.value).format('0.00%')}</span>
          },{
          Header: '+/-',
          accessor: 'diff',
          Cell: props=> <span className='number'>
          {numeral(props.value).format('0.00%')}</span>}]
      }]


    return(
        <div className="body">
          <div className="centered">
          <Modal
          	header='Build Your Competition'
          	trigger={<Button waves='light'>Add Competition</Button>}>
            <CompetitionForm
            addCompetition = {this.addCompetition}
            />
          </Modal>

          </div>
          <ReactTable
            className='-centered -highlight'
            data={this.state.competitions}
            columns={columns}
            minRows={this.state.competitions.length}
            showPagination={false}
            />
        </div>
    )
  }
}

export default Competitions;
