import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies, user, setUser, token }) => {
    const { movieTitle } = useParams();
    const [ isFavorite, setIsFavorite ] = useState(false);
    useEffect(() => {
        const isFavorited = user.FavoriteMovies.inscludes(movieTitle)
        setIsFavorite(isFavorited)
    }, []);
    const removeFavorite = () => {
        fetch(`https://sarjohnsonmyflix-4f5de10aa490.herokuapp.com/users/${user.Username}/${movieTitle}`, {
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
    const addToFavorite = () => {
        fetch(`https://sarjohnsonmyflix-4f5de10aa490.herokuapp.com/users/${user.Username}/${movieTitle}`, {
            method: "PUT",
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
    const movie = movies.find((movie) => movie.Title === movieTitle);
    return (
        <div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>Subgenre: </span>
                <span>{movie.Subgenre.Name}</span>
                <br />
                <span>Description: </span>
                <span>{movie.Subgenre.Description}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
                <br />
                <span>Birth Year: </span>
                <span>{movie.Director.Birth}</span>
            </div>
            {isFavorite ? (
                <Button onClick={removeFavorite}>Remove from favorites</Button>
            ) : (
                <Button onClick={addToFavorite}>Add to favorites</Button>
            )}
            <Link to={"/"}>
                <Button className="back-button">Back</Button>
            </Link>
        </div>
    )
}