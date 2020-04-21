import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import queryString from 'query-string'

import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Image from 'react-bootstrap/Image';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import './App.scss'

import movieService from './services/movieService';

class App extends React.Component {
  render() {
    return (
      <div>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Nav className="mr-auto">
        <Navbar.Brand href="/movie">
          Movies!
        </Navbar.Brand>
        </Nav>
        
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        </Form>
      </Navbar>
      <Container fluid="lg" style={{ paddingTop: '100px' }}>
        <Router>
          <Switch>
            <Route path="/movie/:id/stream" component={MovieStream} />
            <Route path="/movie/:id" component={MovieDetail} />
            <Route path="/movie" component={MovieList} />
          </Switch>
        </Router>
      </Container>
      </div>
    )
  }
}

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: undefined
    }
  }

  componentDidMount() {
    this.getMovies()
  }

  getMovies() {
    const values = queryString.parse(this.props.location.search)
    movieService.getAll(values.search).then(movies => this.setState({movies: movies}))
  }

  render() {
    function renderMovie(movie) {
      return (
        <Link to={`/movie/${movie._id}`}>
          <Card className="darkCard" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`/api/movie/${movie._id}/poster`} />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      );
    };

    return (
      <div className="App">
        <CardDeck style={{ justifyContent: 'space-between' }}>
          {(this.state.movies && this.state.movies.length > 0) ? (
            this.state.movies.map(movie => renderMovie(movie))
          ) : (
            <p>No movies found</p>
          )}
        </CardDeck>
      </div>
    )
  }
}

class MovieDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: undefined
    }
  }

  componentDidMount() {
    this.getMovie()
  }

  getMovie() {
    movieService.getById(this.props.match.params.id).then(movie => this.setState({movie: movie}))
  }

  render() {
    return (
      <div>
        {(this.state.movie) ? (
        <div style={{display: 'flex'}}>
          <div style={{ width: '18rem', flexShrink: 0 }}>
            <Link to={`/movie/${this.state.movie._id}/stream`}>
              <Image src={`/api/movie/${this.state.movie._id}/poster`} rounded fluid />
            </Link>
          </div>
          <div>
            <h3>{this.state.movie.title}</h3>
            <p>{new Date(this.state.movie.release_date).getFullYear()}</p>
            <span><p>::runtime::</p><p>::genres::</p></span>
            <p>{this.state.movie.overview}</p>
          </div>
        </div>
        ) : (
          <p>no movie</p>
        )}
      </div>
    );
  }
}

class MovieStream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id
    }
  }

  render() {
    return (
      <div>
        <video id="videoPlayer" className="player" controls autoPlay> 
          <source src={"/api/movie/" + this.state.id + "/stream"} type="video/mp4" />
        </video>
      </div>
    )
  }
}

export default App;