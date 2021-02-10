import React from "react";
import "./App.css";
import { Route, BrowserRouter as Switch } from "react-router-dom";
import LoginRegister from "./components/Login/LoginRegister";
import Home from "./components/Home/Home";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={LoginRegister} />
      <Route exact path="/home" component={Home} />
    </Switch>
  );
}
export default App;
