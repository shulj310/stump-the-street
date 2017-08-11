export function moneyScroll(height,shift){
  if (height>250){
  let pos = this.state.moneyStyle.bottom + shift*4
  this.setState({moneyStyle:{
    position:"absolute",
    bottom: pos,
    right: 30
  }})
}
if (height<250){
  this.setState({moneyStyle:{
    position:"absolute",
    bottom:-500,
    right:30
  }})
}
}
