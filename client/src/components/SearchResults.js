import React from "react";
import { Link } from "react-router-dom";

import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

import queryString from 'query-string'

import movieService from '../services/movieService';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    const values = queryString.parse(this.props.location.search)
    this.state = {
      search: values.search
    }
  }
  
  componentDidMount() {
    this.getMovies()
  }

  getMovies() {
    movieService.getAll(this.state.search).then(movies => this.setState({movies: movies}))
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

  export default SearchResults;