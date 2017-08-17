import React, { Component } from 'react';
import { Modal, Button, Icon, Col, Preloader } from 'react-materialize'
import CompetitionComponent from '../components/CompetitionComponent'
import CompetitionForm from './CompetitionForm'
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import numeral from 'numeral'
import CreditContainer from './CreditContainer'

class Competitions extends Component{
  constructor(props){
  super(props)
  this.state = {
    competitions: [],
    user_id: 0,
    newPort:0,
    loading: true,
    auth: true,
    wallet:0
  }
  this.addCompetition = this.addCompetition.bind(this)
  this.redirect = this.redirect.bind(this)
}

  componentDidMount(){
    fetch('/api/v1/competitions',{
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok){
        return response.json() }
      else {
        document.location.replace(`/users/sign_in`)
      }
    })
    .then(body =>{
    if (body.auth === false) {
      document.location.replace(`/users/sign_in`)
    }
    this.setState({competitions:body, loading:false})
    })
    fetch('/api/v1/users/show',{
      credentials: 'same-origin'
    })
    .then(response =>{
      if (response.ok){
        return response.json()
      }})
      .then(body => {
        this.setState({wallet:body["wallet"]})
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
      if (body["auth"] == false){
        alert('There was an error in building your competition, please try again')
      }
      if (body["auth"] == "not enough cash"){
        alert ("You do not have enough money in your wallet. Please add more to your account or enter a wager for a lower amount")
      }
      else{

      this.redirect(body.portfolio.id)}
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
          Header: 'Strategy Name',
          accessor: 'name',
          Cell: props => <span>
          <Link to={`/competitions/show/portfolios/${props.original.id}`}>
          <strong>{props.value}</strong></Link>
          </span>
        }, {
          Header: 'Deadline',
          accessor: 'deadline',
          Cell: props=> <span>{String(new Date(
              props.value)).split(" ").slice(0,4).join(" ")}</span>
        },{
        Header: 'Max Payout',
        accessor: 'current_value',
        Cell: props=> <span className='number'>
        {numeral(props.value).format('$0.00')}</span>
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

      let table;

      if (this.state.loading){
        table = <div className="center-align">
                  <Col s={4}>
                    <Preloader
                      size='big'
                      flashing/>
                  </Col>
                </div>
        } else {
        table =  <ReactTable
                    className='-centered -highlight'
                    data={this.state.competitions}
                    columns={columns}
                    minRows={this.state.competitions.length}
                    showPagination={false}
                  />
      }

      let walletButton

      if (this.state.wallet == 0){
        walletButton =
          <div style={{position:"relative",left:0,top:-50}}>
              <Modal
                header='Add to Wallet'
                trigger={<button type='button' className= "btn btn-floating red" style={{fontSize:"130%"}}>$</button>}>
                <CreditContainer
                  lastPage = {"/competitions"}
                />
              </Modal>
            </div>
      }

    return(
        <div className="body">
          <div className="center-align comp-button">
            <Modal
            	header='Select Your Competitor'
            	trigger={<button type='button' className= "btn waves-effect waves-light blue-grey darken-2">Add Competition</button>}>
              <CompetitionForm
              wallet = {this.state.wallet}
              addCompetition = {this.addCompetition}
              />
            </Modal>
          </div>
          {walletButton}
          {table}
          <br/>
        </div>
    )
  }
}

export default Competitions;
