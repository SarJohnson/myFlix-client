import PropTypes from "prop-types";
import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = (data) => {
    return (
    <Card className="h-100">
        <Card.Body>
            <Card.Title>{data?.movie.Title}</Card.Title>
            <Card.Text>{data?.movie.Description}</Card.Text>
            <Link to= {`/movies/${encodeURIComponent(data?.movie.id)}`}>
            <Button className="open-button" variant="link">
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
        Watch: PropTypes.string.isRequired,
        Price: PropTypes.string.isRequired,
    }).isRequired
};