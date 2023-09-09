import PropTypes from "prop-types";
import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie }) => {
    return (
    <Card className="h-100">
        <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Link to= {`/movies/${encodeURIComponent(movie.Title)}`}>
            <Button variant="link">
                Open
            </Button>
            </Link>
        </Card.Body>
    </Card>
    );
};

MovieCard.PropTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Subgenre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired
        }),
    }).isRequired
};