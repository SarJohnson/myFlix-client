import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    useEffect(() => {
        fetch("https://sarjohnsonmyflix-4f5de10aa490.herokuapp.com/movies")
        .then((response) => response.json())
        .then((data) => {
            const moviesFromApi = data.docs.map((doc) => 
            {
                return {
                    _id: doc._id,
                    Title: doc.Title,
                    Description: doc.Description,
                    Subgenre: {
                        Name: doc.Subgenre.Name,
                        Description: doc.Subgenre.Description
                    },
                    Director: {
                        Name: doc.Director.Name,
                        Birth: doc.Director.Birth
                    },
                };
            });
            setMovies(moviesFromApi);
        });
    }, []);
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
                    key={movie.id} 
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