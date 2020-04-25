import React from "react";
import {
  Route,
  withRouter,
  Switch
} from "react-router-dom";

import './App.scss'

import Container from 'react-bootstrap/Container'

import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import Stream from './components/Stream';
import SearchResults from './components/SearchResults';
import TopNav from './components/TopNav';

class Main extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/stream/:id' component={Stream} />
        <Route path='/' component={ App } />
      </Switch>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <>
        <Route path="/" component={TopNav} />
        <Container fluid="lg" style={{ paddingTop: '100px' }}>
          <Route exact path="/movie/:id" component={MovieDetail} />
          <Route exact path="/movie" component={MovieList} />
          <Route exact path="/results" component={SearchResults} />
        </Container>
      </>
    );
  }
}

export default withRouter(Main);