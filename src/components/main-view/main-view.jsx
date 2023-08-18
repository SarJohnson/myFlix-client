import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";

export const MainView = () => {
    const [movies, setMovies] = useState([
        { id: 1, title: "The Exorcist", subgenre: "Demonic Possession", director: "William Friedkin" },
        { id: 2, title: "Paranormal Activity", subgenre: "Found Footage", director: "Oren Peli" },
        { id: 3, title: "The Blair Witch Project", subgenre: "Found Footage", director: "Eduardo Sanchez" },
        { id: 4, title: "Krampus", subgenre: "Monster", director: "Michael Dougherty" },
        { id: 5, title: "The Shining", subgenre: "Psychological", director: "Stanley Kubrick" }
    ]);
    const [selectedMovie, setSelectedMovie] = useState(null);
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