import React from 'react';
import NavBar from '../components/NavBar';
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
      </Switch>
    </BrowserRouter>
    </div>
  )
}

export default App
