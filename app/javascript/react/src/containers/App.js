import React from 'react';
import Competitions from './Competitions'
import HomePage from './HomePage'
import Portfolio from './Portfolio'
import { Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { BrowserRouter } from 'react-router-dom'
import CompetitorIndex from '../components/CompetitorIndex'

const history = createBrowserHistory();

const App = props =>{
  return(
    <div>
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/competitions" component={Competitions}/>
        <Route exact path='/competitors' component={CompetitorIndex}/>
        <Route exact path="/competitions/:comp_id/portfolios/:port_id" component={Portfolio}/>
      </Switch>
    </BrowserRouter>
    </div>
  )
}

export default App
