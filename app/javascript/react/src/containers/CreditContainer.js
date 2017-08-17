import React, {Component} from 'react'
import CreditForm from './CreditForm'

class CreditContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      lastPage: ''
    }
    this.addToWallet = this.addToWallet.bind(this)
  }



  addToWallet(payLoad){
    fetch('/api/v1/users/wallet', {
      method: "PATCH",
      body: JSON.stringify(payLoad),
      credentials: 'same-origin'
    }).then(response =>{
      let body = response.json()
      return body
    }).then(body=>{
      if (body["auth"] == "coupon"){
        alert('You may only enter Coupon Code once!')
      }
      if (body["auth"] == false)
        {alert('Please enter a correct Coupon Code')}
      else{
      document.location.replace(`${this.props.lastPage}`)}
    })
  }

  componentDidMount(){
    this.setState({lastPage:this.props.lastPage})
  }
  render(){

    return(
      <CreditForm
        addToWallet = {this.addToWallet}
      />
    )
  }
}

export default CreditContainer
