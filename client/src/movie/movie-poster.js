import React from "react";
import {
    Link,
} from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import LazyLoad from "react-lazyload";

import './movie-poster.css';

export default function MoviePoster(props) {
    const movie = props.movie
    const height = props.height
    const width = props.width
    return (
        <Link to={`/stream/${movie._id}`} className="image-container">
            <LazyLoad height={200}>
                <Card.Img variant="top" src={`/api/movie/${movie._id}/poster`}  style={{height: height, width: width}} className="image"/>
                <Button variant="link" className="overlay">
                    <img src={`${process.env.PUBLIC_URL}/assets/play.svg`} alt="Play"  className="icon"/>
                </Button>
            </LazyLoad>
        </Link>
    );
}