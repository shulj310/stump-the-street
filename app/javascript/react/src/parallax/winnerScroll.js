export function winnerScroll(height,shift){
  if (height>300){
  let pos = this.state.winnersStyle.bottom + shift*2
  console.log(this.state.winnersStyle.bottom)
  this.setState({winnersStyle:{
    position:"absolute",
    bottom: pos,
    right:10
  }})
}
if (height<300){
  this.setState({winnersStyle:{
    position:"absolute",
    bottom:-800,
    right:10
  }})
}
}
