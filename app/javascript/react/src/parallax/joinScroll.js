export function joinScroll(height,shift){
    let starter = 100
    if (height<200){
      this.setState({showJoin:false,joinStyle:{
        position:"absolute",
        top:300,
        left:0
      }})
    }
    if (height>200){
      this.setState({showJoin:true,joinStyle:{
          position: "fixed",
          top: 20,
          right:20
      }})}
    }
    // if ((height > 100)&& (height<130)){
    //   let currentPos = Math.max(this.state.joinStyle.top,height)
    //   let newPos = currentPos + shift
    //   this.setState({showJoin:true,joinStyle:{
    //       position: "absolute",
    //       top: newPos,
    //       left: ((document.body.clientWidth/2) - 80)
    //   }})}
    //   if (height>130){
    //     let currentPos = 170
    //     let leftPos = this.state.joinStyle.left + shift*2
    //     let leftBottom = Math.max(document.body.clientWidth/2 -80,leftPos)
    //     let left = Math.min(leftBottom,document.body.clientWidth-200)
    //     this.setState({showJoin:true,joinStyle:{
    //         position:"fixed",
    //         top:currentPos,
    //         left: left
    //     }})
    //   }
  // }
