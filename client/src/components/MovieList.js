import React from "react";
import {
    Link,
} from "react-router-dom";

import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

import movieService from '../services/movieService';

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
      movieService.getAll().then(movies => this.setState({movies: movies}))
    }
  
    render() {
      function renderMovie(movie) {
        return (
          <div key={`${movie._id}`}>
            <Card bg="dark" text="white" style={{ width: '18rem'}}  >
              <Link to={`/stream/${movie._id}`}>
                <Card.Img variant="top" src={`/api/movie/${movie._id}/poster`} />
              </Link>
              <Link to={`/movie/${movie._id}`} style={{color: 'white'}}>
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                </Card.Body>
              </Link>
            </Card>
          </div>
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

  export default MovieList