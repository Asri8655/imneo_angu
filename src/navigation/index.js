import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Worklist from '../components/worklist';
export default function Navigation() {
  return (
    <Router>
    <Switch>
      <Route path="/" component={Worklist}/>
      </Switch>
      </Router>
  )
}