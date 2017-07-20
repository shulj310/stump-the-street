import React from "react";
import { Link } from 'react-router-dom'

const NavBar = (props) =>{

  return(
    <div>
      <ul>
        <li><Link to="/"/></li>
        <li><Link to="/competitions" component={Competitions}/></li>
      </ul>
      <h1>Hello from NavBar!</h1>
    </div>
  )
}

export default NavBar
