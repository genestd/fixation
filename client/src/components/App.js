import React from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import FixationNav from '../components/FixationNav'
import Home from '../components/Home'
import Profile from '../components/Profile'

const App = (props) => {
  return (
    <Router>
      <div id="fixApp">
        <div id="topAnchor"></div>
        <FixationNav />
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/profile" component={Profile}/>
          <Route path="*" component={NotFound}/>
        </Switch>
        <div id="bottomAnchor">.</div>
      </div>
    </Router>
  )
}

const NotFound = () => {
  return (<h1>Not Found</h1>)
}

export default App
