import React, {Component} from 'react'
import CreditContainer from './CreditForm'

class CreditContainer extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
    this.addToWallet = this.addToWallet.bind(this)
  }

  addToWallet(payLoad){
    fetch('/api/v1/users/', {
      method: "POST",
      body: JSON.stringify(payLoad),
      credentials: 'same-origin'
    }).then(response =>{
      let body = response.json()
      return body
    }).then(body=>{
      this.redirect('/users/edit')
    })
  }

  componentDidMount(){

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
