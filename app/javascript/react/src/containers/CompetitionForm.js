import React, { Component } from 'react';
import TextField from "../components/TextField"
import SelectField from "../components/SelectField"
import ImageTile from "../components/ImageTile"
import { Row,Button } from 'react-materialize'
import ErrorTile from '../components/ErrorTile'
import { errorDictionary } from '../utils/competitionErrorDictionary'
import { oddsDictionary } from '../utils/oddsDictionary'
import numeral from 'numeral'



class CompetitionForm extends Component{
  constructor(props){
  super(props)
  this.state = {
    length: "",
    wager_amount: "",
    competitor: 0,
    showPortfolio: false,
    portfolio_name:"",
    errorList: [],
    hoverShow:0,
    errors:false,
    possibleWinnings:0
  }
  this.handleChange = this.handleChange.bind(this)
  this.handleFormSubmit = this.handleFormSubmit.bind(this)
  this.handleClearForm = this.handleClearForm.bind(this)
  this.handleCompClick = this.handleCompClick.bind(this)
  this.handleHover = this.handleHover.bind(this)
  this.showPortfolio = this.showPortfolio.bind(this)
  this.handleError = this.handleError.bind(this)
  this.errorLister = this.errorLister.bind(this)
  this.showPossibleWinnings = this.showPossibleWinnings.bind(this)
}

  showPortfolio(event){
    event.preventDefault()
    this.setState({showPortfolio:!this.state.showPortfolio})
  }

  handleError(field){
    return errorDictionary(field).conditional(this.state[field])
  }

  errorLister(){

    let errors = Object.keys(this.state).map((key)=> {
      if (key !== 'errorList' &&
      key !== 'showPortfolio' &&
      key !== 'hoverShow' &&
      key !== 'errors' &&
      key !== 'possibleWinnings'){
        if (this.handleError(key)) {
          return errorDictionary(key).message
          }
        }
      })
    return errors.filter(key => key !== undefined)
    // let newErrors = errors.filter(key => key !== undefined)
    // this.setState({errorList:newErrors})
    // return newErrors
}
  handleFormSubmit(event){
    event.preventDefault();

    let errorList = this.errorLister()

    if (errorList.length === 0){
    let formPayload = {
      wager_amount: this.state.wager_amount,
      length: this.state.length,
      competitor:this.state.competitor,
      strategy:this.state.portfolio_name
    }
    this.props.addCompetition(formPayload)

    this.handleClearForm(event);
  } else{
    alert('Please fill out entire form!')
    // this.setState({errors:true})
  }
}

  handleClearForm(event){
    event.preventDefault();
    this.setState({
      wager_amount:"",
      portfolio_name:"",
      competitor:0,
      showPortfolio: false,
      hoverShow:0,
      errorList:[],
      errors:false
    })
  }

  handleHover(event){
    this.setState({hoverShow:event.target.id})
  }


  handleChange(event){
    this.setState({[event.target.name]:event.target.value})
    if (event.target.name == 'wager_amount'){
      this.showPossibleWinnings(event.target.value,"")
    }
    if (event.target.name == 'length') {
      this.showPossibleWinnings('',event.target.value)
    }
  }

  handleCompClick(event){
    this.setState({competitor:event.target.id})
  }

  showPossibleWinnings(value,timelength){

    if (value == ''){
      value = this.state.wager_amount
    }

    if (timelength == '') {
      timelength = this.state.length
    }

    if (timelength != "" && value != ''){
      let dollarReturn = oddsDictionary[timelength]
      let payOut = dollarReturn[2]*value
      this.setState({possibleWinnings:payOut})
    }else{
    this.setState({possibleWinnings:0})
    }
  }

  render(){

    let options = [
      {"": "Select Timeline (Payout on $100)"},
      {"1":"1 Day ($33.00)"},
      {"3":"3 Days ($47.50)"},
      {"7": "1 Week ($71.40)"},
      {"14": "2 Weeks ($90.50)"},
      {"28": "4 Weeks ($95.00)"},
      {"56": "8 Weeks ($104.50)"}
    ]

    let images = ['cramer','bull','street']

    let imageTiles = images.map((image,index)=>{

      let id = index +1
      let selected = "competitors"
      let text;

      if (id == this.state.competitor) {
        selected = "img-selected competitors"
        text = "Stump the" + image
      }

      if (id == this.state.hoverShow) {
        image = image+"Hover"
      }


      return(

      <ImageTile
        key={index}
        name={image}
        handlerFunction = {this.handleCompClick}
        hoverFunction = {this.handleHover}
        id={index+1}
        width={200}
        width={200}
        selected={selected}
        text={text}
        label={true}
        end="png"
      />
      )
    })

    let errorMessage
    let portfolioForm;
    let tradeButton;
    let portfolioButton = <button
              type='button'
              className= "btn waves-effect waves-light blue-grey darken-2"
              onClick={this.showPortfolio}>
              Create Portfolio
            </button>

    if (this.state.showPortfolio) {

      portfolioForm = <TextField
        name="portfolio_name"
        content={this.state.portfolio_name}
        handlerFunction={this.handleChange}
        label= "Portfolio's Name"
        />

      tradeButton = <button
        className= "btn waves-effect waves-light blue-grey darken-2"
        type="submit">
        Start Trading
        </button>

      portfolioButton = ""
    }

    if (this.state.errors){
      errorMessage = <h1>Please fill in entire form </h1>
    }

    let payOut;

    if (this.state.possibleWinnings > 0){
      payOut = <span style={{paddingRight:"1%",fontWeight:700}}>Payout: {numeral(this.state.possibleWinnings).format('$0.00')}</span>
    }


    return(
      <form className="form" onSubmit={this.handleFormSubmit}>
        <Row className="center-align">
          {imageTiles}
        </Row>
        <SelectField
          content={this.state.length}
          label= "Length of Contest"
          name="length"
          handlerFunction={this.handleChange}
          options={options}
        />
        {payOut}
        <span>Current Balance: {numeral(this.props.wallet).format('$0.00')}</span>
        <TextField
          content={this.state.wager_amount}
          label= "Wager Amount ($)"
          name="wager_amount"
          handlerFunction={this.handleChange}
        />
        {portfolioButton}
        {portfolioForm}
        {errorMessage}
        {tradeButton}
      </form>
    )
  }
}

export default CompetitionForm;
