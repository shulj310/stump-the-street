import React, { Component } from 'react';
import TextField from "../components/TextField"
import SelectField from "../components/SelectField"
import ImageTile from "../components/ImageTile"
import { Row,Button } from 'react-materialize'
import ErrorTile from '../components/ErrorTile'
import { errorDictionary } from '../utils/competitionErrorDictionary'


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
    errors:false
  }
  this.handleChange = this.handleChange.bind(this)
  this.handleFormSubmit = this.handleFormSubmit.bind(this)
  this.handleClearForm = this.handleClearForm.bind(this)
  this.handleCompClick = this.handleCompClick.bind(this)
  this.handleHover = this.handleHover.bind(this)
  this.showPortfolio = this.showPortfolio.bind(this)
  this.handleError = this.handleError.bind(this)
  this.errorLister = this.errorLister.bind(this)
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
      key !== 'errors'){
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
      length: "",
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
  }

  handleCompClick(event){
    this.setState({competitor:event.target.id})
  }

  render(){

    let options = [
      {"": "Select Timeline"},
      {"4": "1 Month"},
      {"8": "2 Months"},
      {"12": "3 Months"},
      {"24": "6 Months"}
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
        selected={selected}
        text={text}
      />
      )
    })

    let errorMessage
    let portfolioForm;
    let tradeButton;
    let portfolioButton = <Button
              waves='light'
              onClick={this.showPortfolio}>
              Create Portfolio
            </Button>

    if (this.state.showPortfolio) {

      portfolioForm = <TextField
        name="portfolio_name"
        content={this.state.portfolio_name}
        handlerFunction={this.handleChange}
        label= "Portfolio's Name"
        />

      tradeButton = <Button
        waves='light'
        type="submit">
        Start Trading
        </Button>

      portfolioButton = ""
    }

    if (this.state.errors){
      errorMessage = <h1>Please fill in entire form </h1>
    }


    // <input type="submit" value="Submit" />
    //
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
