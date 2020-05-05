import React from "react";
import {
  Route,
  withRouter,
  Switch,
  Redirect
} from "react-router-dom";

import './App.scss'

import Container from 'react-bootstrap/Container'

import MovieList from './movie/movie-list';
import MovieDetail from './movie/movie-detail';
import Stream from './common/stream';
import SearchResults from './common/search-results';
import TopNav from './common/top-nav';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/stream/:id' component={Stream} />
        <Route path='/' component={ Frame } />
      </Switch>
    );
  }
}

class Frame extends React.Component {
  render() {
    return (
      <>
        <Route path="/" component={TopNav} />
        <Route exact path="/">
          <Redirect to="/movie"/>
        </Route>
        <Container fluid="lg" style={{ paddingTop: '100px' }}>
          <Route exact path="/movie/:id" component={MovieDetail} />
          <Route exact path="/movie" component={MovieList} />
          <Route path="/results/:search" component={SearchResults} />
        </Container>
      </>
    );
  }
}

export default withRouter(App);