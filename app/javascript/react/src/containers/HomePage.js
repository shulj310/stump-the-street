import React, {Component} from 'react';
import ImageTile from '../components/ImageTile'
import { Carousel } from 'react-materialize'
import ReactTooltip from 'react-tooltip'

class HomePage extends Component{
  constructor(props){
    super(props)
    this.state ={
      onHover:0,
      showDescription:0

    }
    this.handleHover = this.handleHover.bind(this)
    this.redirect = this.redirect.bind(this)
    this.handleDescription = this.handleDescription.bind(this)
    this.clearDescription = this.clearDescription.bind(this)
  }

  handleHover(event){
    this.setState({hoverShow:event.target.id})
  }

  redirect(){
    document.location.replace(`/users/sign_up`)
  }

  handleDescription(event){
    this.setState({showDescription:event.target.id})
  }
  clearDescription(event){
    this.setState({showDescription:0})
  }

  render(){

    let description,
    width = 250,
    height = 250

    let images = ['justCramer','justBull','justStreet']

    let imageTiles = images.map((image,index)=>{

      let id = index +1
      let selected = "competitors"
      let text;

      if (id == this.state.hoverShow) {
        image = image+"Hover"
      }

      if (id == this.state.showDescription){
        width = 300
        height = 300
      }
      if (id != this.state.showDescription){
        width = 275
        height = 275
      }
      // hoverFunction = {this.handleHover}
      // handlerFunction = {this.handleCompClick}
      // onMouseOver = {this.handleDescription}
      // onMouseOut = {this.clearDescription}

      return(
    <div className="center-align img-block">
      {description}
      <div className="home-image"
        key = {index}
        id = {index+1}
        >
      <ImageTile
        key={index}
        name={image}
        id={index+1}
        selected={selected}
        text={text}
        width={width}
        height={height}
        label={false}
        end="svg"
      />
      </div>
    </div>
      )
    })

    return(
    <div>
      <div>
        <h1>Do you have what it takes to <strong>Stump the Street?</strong></h1>
      </div>
      <div className="center-align">
      <button
        type='button'
        className= "btn-large waves-effect waves-light green darken-4"
        onClick={this.redirect}>
        Join for Free
      </button>
      </div>
      <br/>
      <div className="center-align">
        {imageTiles}
      </div>
      <h4>Carosel of winners!</h4>

      <h3>How it works</h3>
      <p>description of how it works</p>
    </div>

    )
  }
}

export default HomePage
