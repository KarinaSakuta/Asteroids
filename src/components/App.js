import React, {Component} from 'react';
import NotFoundPage from './NotFoundPage';
import DetailsPage from './DetailsPage';
import ListPage from './ListPage';
import Header from './Header';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <Header />
          <main className="main">
            <Switch>
              <Route component={ListPage} exact={true} path="/"></Route>
              <Route component={DetailsPage} path="/details/:asteroidId"></Route>
              <Route component={NotFoundPage} path="/NotFound"></Route>
              <Route component={NotFoundPage}></Route>
            </Switch>
          </main>
          <Footer />
        </Router>
      </div>
    );
  }
}
