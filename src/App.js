import React from "react";
import "./App.css"
import Mainpage from "./components/mainpage"
import Archive from "./components/archives";
import Info from "./components/info";

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"

const App = () => {

  return (
    <Router>
      <div className="nav">
        <Link to="/">ETUSIVU</Link>
        <Link to="/arkisto">ARKISTO</Link>
        <Link to="/info">INFO</Link>
      </div>
      <Switch>
        <Route path="/arkisto">
          <Archive />
        </Route>
        <Route path="/info">
          <Info />
        </Route>
        <Route path="/">
          <Mainpage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
