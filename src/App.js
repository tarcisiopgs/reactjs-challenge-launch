import React from 'react';

import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Client from './pages/Client';

function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route path="/" exact={true} component={Main} />
              <Route path="/clients/create" component={Client} />
              <Route path="/clients/:id/edit" component={Client} />
          </Switch>
      </BrowserRouter>
  );
}

export default App;
