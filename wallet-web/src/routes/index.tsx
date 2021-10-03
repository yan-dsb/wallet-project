import React from 'react';

import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Transfer from '../pages/Transfer';
import Transactions from '../pages/Transactions';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/transfer" component={Transfer} isPrivate />
    <Route path="/transactions" component={Transactions} isPrivate />
  </Switch>
);

export default Routes;
