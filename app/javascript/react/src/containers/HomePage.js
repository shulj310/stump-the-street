import React, {Component} from 'react';
import ImageTile from '../components/ImageTile'

class HomePage extends Component{
  constructor(props){
    super(props)
    this.state ={
      onHover:0

    }
    this.handleHover = this.handleHover.bind(this)
  }

  handleHover(event){
    this.setState({hoverShow:event.target.id})
  }

  render(){

    let images = ["cramer","bull","street"]

    return(
    <div>
      <h1>Do you have what it takes to stump the street?</h1>
      <h4>Images go here!</h4>
      <p>hover functionality</p>
      <h6>Brief description of each competition</h6>
      <a href="#">Join for Free</a>

      <h4>Carosel of winners!</h4>

      <h3>How it works</h3>
      <p>description of how it works</p>
    </div>

    )
  }
}

export default HomePage
