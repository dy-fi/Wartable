import React from 'react';
import './App.css';

import { BrowserRouter, Route, Switch } from "react-router-dom";

import index from "./components/index";
import targetForm from "./components/targetForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={index}/>
          <Route exact path="/form" component={targetForm}/>
          <Route path="/target/:name/:url/:path"/>
          <Route exact path="/room/:roomID" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
