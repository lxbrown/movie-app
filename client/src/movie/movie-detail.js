import React, { useState, useEffect } from "react";
import {
    Link,
    useParams
} from "react-router-dom";

import Image from 'react-bootstrap/Image';

import movieService from './movie-service';

const MovieDetail = (props) => {
  let { id } = useParams();
  const [movie, setMovie] = useState(props.location.state ? props.location.state.movie : null);

  useEffect(() => {
    if (!movie) {
      getMovie()
    }
  })

  const getMovie = async () => {
    let res = await movieService.getById(id)
    setMovie(res)
  }

  return (
    <div>
      {(movie) ? (
      <div style={{display: 'flex'}}>
        <div style={{ width: '13rem', flexShrink: 0 }}>
          <Link to={`/stream/${movie._id}`}>
            <Image src={`/api/movie/${movie._id}/poster`} rounded fluid />
          </Link>
        </div>
        <div style={{paddingLeft: '30px'}}>
          <h3>{movie.title}</h3>
          <p style={{color: 'grey'}}>{new Date(movie.release_date).getFullYear()}</p>
          <span><p>::runtime::</p><p>::genres::</p></span>
          <p>{movie.overview}</p>
        </div>
      </div>
      ) : (
        <p>no movie</p>
      )}
    </div>
  );
}

export default MovieDetail;