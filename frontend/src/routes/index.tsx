import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Details from '../pages/Details';
import Create from '../pages/Create';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/pacientes/:id" exact component={Details} />
    <Route path="/criar" exact component={Create} />
  </Switch>
);

export default Routes;
