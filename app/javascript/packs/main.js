import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import App from '../react/src/containers/App'
import CreditContainer from '../react/src/containers/CreditContainer'


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('app'))
});

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <CreditContainer />,
    document.getElementById('ccform'))
})
