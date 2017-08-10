export function howToPlayScroll(height,shift){

  if (height>50){
  let pos = this.state.howToPlayStyle.top - shift*.75
  this.setState({howToPlayStyle:{
    position:"absolute",
    top:pos,
    left:((document.body.clientWidth/2)-(this.state.htpWidth/2))

  }})
}
if(height<50){
  this.setState({howToPlayStyle:{
    position:"absolute",
    top:600,
    left:((document.body.clientWidth/2)-(this.state.htpWidth/2))
  }})
}
}
