export function imagesShift(height,shift){
  if (height > 100){
    let currentPos = Math.min(this.state.imgStyle.left,((document.body.scrollWidth/2) -(
            (this.refs.imgTiles.offsetWidth)/2)))
    let newPos = currentPos - (shift*3)
    this.setState({showImg:true,imgStyle:{
      position:"absolute",
      top: 300,
      left:newPos,
      maxWidth:2000,
      width:(document.body.scrollWidth)

    }})
    }else {
      this.setState({showImg:false,imgStyle:{
        position:"absolute",
        top:0,
        left:((document.body.scrollWidth/2) -(
                (this.refs.imgTiles.offsetWidth)/2))
      }})
    }

}
