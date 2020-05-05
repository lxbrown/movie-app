import React from "react";
import {
    Link,
} from "react-router-dom";

import TextTruncate from 'react-text-truncate';

import Card from 'react-bootstrap/Card';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import LazyLoad from "react-lazyload";

function renderTooltip(text) {
    return (
      <Tooltip>
        {text}
      </Tooltip>
    );
  }

export default function MovieCard(props) {
    const movie = props.movie
    return (
        <div key={`${movie._id}`}>
            <Card text="white" className="card" >
                <Link to={`/stream/${movie._id}`}>
                <LazyLoad height={200}>
                    <Card.Img variant="top" src={`/api/movie/${movie._id}/poster`} style={{height: '17.75rem'}}/>
                </LazyLoad>
                </Link>
                <Link
                    to={{
                        pathname: `/movie/${movie._id}`,
                        state: {movie: movie}
                    }} 
                    style={{color: 'white'}}
                >
                <Card.Body>
                    <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 350, hide: 150 }}
                        overlay={renderTooltip(movie.title)}
                    >
                    <Card.Title className='card-title'>
                        <TextTruncate
                            line={1}
                            text={movie.title}
                        />
                    </Card.Title>
                    </OverlayTrigger>
                    <Card.Subtitle className='card-subtitle'>{new Date(movie.release_date).getFullYear()}</Card.Subtitle>
                </Card.Body>
                </Link>
            </Card>
        </div>
    );
}