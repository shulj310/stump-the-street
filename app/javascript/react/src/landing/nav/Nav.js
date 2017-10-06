import React from 'react'
import Logo from './Logo'

const Nav = props =>{


  return(
    <div>
      <ul style={{
        listStyleType: "none",
        margin:0,
        padding:0,
        overflow: "hidden"}}>
        <li style={{
            float:"left",
            display:"block",
            padding:"5px",
            textDecoration:"none",
            maxWidth:"65vw"
        }}>
          <Logo />
        </li>
        <li style={{
            float:"right",
            display:"block",
            padding:"5px",
            fontSize:"1.5vw",
            textDecoration:"none"
        }}>
           <a href="/users/sign_in"> Beta Login</a>
        </li>
      </ul>
    </div>
  )
}

export default Nav
