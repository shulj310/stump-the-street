import React from 'react';
import NavBar from '../components/NavBar';
import Competitions from './Competitions'
import Portfolio from './Portfolio'
import { Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { BrowserRouter } from 'react-router-dom'

const history = createBrowserHistory();

const App = props =>{
  return(
    <div>
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path='/' component={NavBar} />
        <Route path="/competitions" component={Competitions}/>
        <Route path="/portfolios/:id" component={Portfolio}/>
      </Switch>
    </BrowserRouter>
    </div>
  )
}

export default App
