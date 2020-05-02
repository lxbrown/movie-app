import React from "react";
import { Link } from "react-router-dom";

import TextTruncate from 'react-text-truncate';

import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import movieService from '../services/movieService';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: undefined
    }
  }
  
  componentDidMount() {
    this.getMovies()
  }

  componentDidUpdate() {
    this.getMovies()
  }

  getMovies() {
    movieService.getAll(this.props.match.params.search).then(movies => this.setState({movies: movies}))
  }
  
  render() {
    function renderTooltip(props) {
      return (
        <Tooltip id="button-tooltip" {...props}>
          {props.title}
        </Tooltip>
      );
    }
  
    function renderMovie(movie) {
      return (
        <div key={`${movie._id}`}>
          <Card text="white" className="card" >
            <Link to={`/stream/${movie._id}`}>
              <Card.Img variant="top" src={`/api/movie/${movie._id}/poster`} style={{height: '17.75rem'}}/>
            </Link>
            <Link to={`/movie/${movie._id}`} style={{color: 'white'}}>
              <Card.Body>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 350, hide: 150 }}
                  overlay={renderTooltip(movie)}
                >
                  <Card.Title className='card-title'>
                    <TextTruncate
                      line={1}
                      text={movie.title} />
                  </Card.Title>
                </OverlayTrigger>
                <Card.Subtitle className='card-subtitle'>{new Date(movie.release_date).getFullYear()}</Card.Subtitle>
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

  export default SearchResults;