import React from 'react';
import { Container } from 'semantic-ui-react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Navbar from '~/src/components/Navbar';
import routes from '~/src/routes';
import { history, historyCb } from '~/src/helpers/history';
import store from '~/src/store';

history.listen(historyCb);
historyCb(window.location);

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Container style={{ marginBottom: 50 }}>
        <Navbar />
        <Switch>
          {routes.map((route, i) => <Route key={i} {...route} />)}
        </Switch>
      </Container>
    </Router>
  </Provider>
);

export default App;
