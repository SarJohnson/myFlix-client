import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies, user, setUser, token }) => {
    const { movieId } = useParams();
    const [ isFavorite, setIsFavorite ] = useState(false);
    useEffect(() => {
        const isFavorited = user.FavoriteMovies.includes(movieId)
        setIsFavorite(isFavorited)
    }, []);
    const removeFavorite = () => {
        fetch(`https://sarjohnsonmyflix-4f5de10aa490.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
        }).then((data) => {
            setIsFavorite(false);
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
        })
    };
    const addFavorite = () => {
        fetch(`https://sarjohnsonmyflix-4f5de10aa490.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
        }).then((data) => {
            setIsFavorite(true);
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
        })
    };
    const movie = movies.find((movie) => movie.id === movieId);
    return (
        <div>
            <div className="pennywise">
                <img
                style={{ width: 200, height: 200 }}
                src={require("../images/pennywise.gif")}
                />
            </div>
            <div>
                <h5>Title: </h5>
                <span>{movie?.Title}</span>
            </div>
            <div>
                <h5>Description: </h5>
                <span>{movie?.Description}</span>
            </div>
            <div>
                <h5>Subgenre: </h5>
                <span>{movie?.Subgenre?.Name}</span>
                <br />
                <h5>Description: </h5>
                <span>{movie?.Subgenre?.Description}</span>
            </div>
            <div>
                <h5>Director: </h5>
                <span>{movie?.Director?.Name}</span>
                <br />
                <h5>Birth Year: </h5>
                <span>{movie?.Director?.Birth}</span>
            </div>
            <div>
                <h5>Watch: </h5>
                <Link to={movie?.Watch} target="_blank">{movie?.Watch}</Link>
            </div>
            <div>
                <h5>Price: </h5>
                <span>{movie?.Price}</span>
            </div>
            {isFavorite ? (
                <Button className="favorite-button" onClick={removeFavorite}>Remove from favorites</Button>
            ) : (
                <Button className="favorite-button" onClick={addFavorite}>Add to favorites</Button>
            )}
            <div>
            <Link to={"/"}>
                <Button className="back-button">Back</Button>
            </Link> 
            </div>
            <div className="michael">
                <img
                style={{ width: 250, height: 250 }}
                src={require("../images/michael.gif")}
                />
            </div>
        </div>
    )
}

MovieView.PropTypes = {
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