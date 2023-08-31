import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx";

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser: null);
    const [token, setToken] = useState(storedToken? storedToken: null);

    useEffect(() => {
        if (!token) {
            return;
        }
        fetch("https://sarjohnsonmyflix-4f5de10aa490.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => response.json())
        .then((data) => {
            const moviesFromApi = data.map((movie) => {
                return {
                    _id: movie._id,
                    Title: movie.Title,
                    Description: movie.Description,
                    Subgenre: {
                        Name: movie.Subgenre.Name,
                        Description: movie.Subgenre.Description
                    },
                    Director: {
                        Name: movie.Director.Name,
                        Birth: movie.Director.Birth
                    },
                };
            });
            console.log("movies from api: ", data);
            setMovies(moviesFromApi);
        });
    }, [token]);

    if (!user) {
        return (
        <>
        <LoginView 
        onLoggedIn={(user,token) => {
            setUser(user);
            setToken(token);
        }} />
        or
        <SignupView />
        </>
        );
    }

    if (selectedMovie) {
        return (
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    } else {
        return (
            <div>
                {movies.map((movie) => (
                    <MovieCard 
                    key={movie.Title} 
                    movie={movie} 
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                    />
                ))}
            </div>
        );
    }
};

<button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>