import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./Login";
import { Customers } from "./Customers";
import { Appliances } from "./Appliances";

function App() {
  return (
    <div className="App conatiner-fluid">
      <Router>
        <Switch>
          <Route path="/customers">
            <Customers />
          </Route>
          <Route path="/appliances">
            <Appliances />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
