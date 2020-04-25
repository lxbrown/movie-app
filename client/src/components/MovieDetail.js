import React from "react";
import {
    Link,
} from "react-router-dom";

import Image from 'react-bootstrap/Image';

import movieService from '../services/movieService';

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
              <Link to={`/stream/${this.state.movie._id}`}>
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

  export default MovieDetail;