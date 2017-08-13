import React, {Component} from 'react';
import ImageTile from '../components/ImageTile'
import { Icon } from 'react-materialize'
import ReactTooltip from 'react-tooltip'
import HowToPlay from '../components/HowToPlay'
import { joinScroll } from '../parallax/joinScroll'
import { imagesShift } from '../parallax/imagesShift'
import { howToPlayScroll } from '../parallax/howToPlayScroll'
import { winnerScroll } from '../parallax/winnerScroll'
import  WinnersTile  from '../components/WinnersTile'
import MoneyPile from '../components/MoneyPile'
import {moneyScroll} from '../parallax/moneyScroll'

class HomePage extends Component{
  constructor(props){
    super(props)
    this.state ={
      showJoin:false,
      joinStyle:{
        position:"absolute",
        top:100,
        left:0
      },
      showImg:false,
      imgStyle:{
        position:"relative",
        top:0,
        left:0,
        maxWidth: 2000,
        width: document.body.scrollWidth
      },
      winnersStyle:{
        position:"absolute",
        bottom:-800,
        right:20
      },
      howToPlayStyle:{
        position:"absolute",
        top:600,
        left:0
      },
      moneyStyle:{
        position:"absolute",
        bottom:-600,
        right: 30
      },
      lastScroll:0,
      divHeight:1500,
      htpWidth:800,
      totalHeight:800

    }
    this.handleHover = this.handleHover.bind(this)
    this.redirect = this.redirect.bind(this)
    this.handleDescription = this.handleDescription.bind(this)
    this.clearDescription = this.clearDescription.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
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

  handleScroll(){
    let height = window.scrollY
    console.log(`height: ${height}`)
    let shift = (height-this.state.lastScroll)*1
    joinScroll.call(this,height,shift)
    imagesShift.call(this,height,shift)
    howToPlayScroll.call(this,height,shift)
    winnerScroll.call(this,height,shift)
    moneyScroll.call(this,height,shift)
    this.setState({lastScroll:window.scrollY})
  }

  componentDidMount(){
    window.addEventListener('scroll',this.handleScroll);
    let text = document.getElementById('stump-text').clientHeight
    let button = document.getElementById('button-join').clientHeight
    let img = document.getElementById('imgTiles').clientHeight
    let totalHeight = text + button + img + 200
    let htpWidth = document.getElementById('htp').clientWidth
    let centerHTP = ((document.body.clientWidth/2) - (htpWidth/2))
    this.setState({divHeight:document.getElementById('htp').clientHeight*1.25})
    this.setState({htpWidth:htpWidth})
    this.setState({howToPlayStyle:{position:"absolute", top: totalHeight,left: centerHTP,totalHeight:totalHeight}})
  }

  render(){
    let description,
    width = 250,
    height = 250,
    joinStyle,
    joinStyleClass = "center-align",
    imgStyle,
    imgStyleClass = "center-align"

    if (this.state.showJoin){
      joinStyle = this.state.joinStyle
      joinStyleClass = ""
    }

    if (this.state.showImg){
      imgStyle = this.state.imgStyle
      imgStyleClass = ""
    }

    let images = ['justCramer','justBull','justStreet']

    let imgDict = {'justCramer':"Cramer",'justBull':"The Pros","justStreet":"The Market"}

    let imageTiles = images.map((image,index)=>{

      let id = index +1
      let selected = "competitors"
      let text


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
            <div style={{fontSize:"150%",color:"#37474F"}}>
            {imgDict[image]}
            </div>
          </div>
            )
    })

    let heightStyle = {height:Math.max(this.state.divHeight,960)}
//
    return(
    <div>
      <div id="stump-text" className="center-align">
        <h1>Do you have what it takes to Stump the Street?</h1>
      </div>
      <div id="button-join" className={joinStyleClass} style={joinStyle}>
      <button
        type='button'
        className= "btn-large waves-effect waves-light green darken-4"
        onClick={this.redirect}>
        Join for Free
      </button>
      </div>
      <br/>
      <div ref="imgTiles" id="imgTiles" className={imgStyleClass} style={imgStyle}>
        {imageTiles}
      </div>
      <br/>

      <div id="htp" style={this.state.howToPlayStyle}>
        <HowToPlay />
      </div>
      <div style={this.state.winnersStyle}>
        <WinnersTile />
      </div>
      <div style={heightStyle}>
      </div>
    </div>

    )
  }
}

export default HomePage
