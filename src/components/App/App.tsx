import React from "react";
import HomePage from '../../pages/home';
import PageNotFound from '../../pages/404';
import { HOME_ROUTE } from '../../constants/route_names';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default function () {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path={HOME_ROUTE} component={HomePage}/>
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  )
}