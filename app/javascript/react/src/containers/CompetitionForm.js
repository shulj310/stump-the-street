import React, { Component } from 'react';
import TextField from "../components/TextField"
import SelectField from "../components/SelectField"
import ImageTile from "../components/ImageTile"
import { Row,Button } from 'react-materialize'


class CompetitionForm extends Component{
  constructor(props){
  super(props)
  this.state = {
    length: "",
    wager_amount: "",
    competitor: 0,
    showPortfolio: false,
    portfolio_name:""
  }
  this.handleChange = this.handleChange.bind(this)
  this.handleFormSubmit = this.handleFormSubmit.bind(this)
  this.handleClearForm = this.handleClearForm.bind(this)
  this.handleCompClick = this.handleCompClick.bind(this)
  this.handleHover = this.handleHover.bind(this)
  this.showPortfolio = this.showPortfolio.bind(this)
}




  showPortfolio(event){
    event.preventDefault()
    this.setState({showPortfolio:!this.state.showPortfolio})
    console.log(this.state.showPortfolio)
  }

  handleFormSubmit(event){
    event.preventDefault();
    let formPayload = {
      wager_amount: this.state.wager_amount,
      length: this.state.length,
      competitor:this.state.competitor,
      strategy:this.state.portfolio_name
    }
    this.props.addCompetition(formPayload)

    this.handleClearForm(event);
  }

  handleClearForm(event){
    event.preventDefault();
    this.setState({
      length: "",
      wager_amount:"",
      competitor:0,
      hoverShow:0
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
      let selected;
      let text;

      if (id == this.state.competitor) {
        selected = "img-selected"
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


    // <input type="submit" value="Submit" />
    //
    return(
      <form className="form" onSubmit={this.handleFormSubmit}>
        <Row>
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
        {tradeButton}
      </form>
    )
  }
}

export default CompetitionForm;
