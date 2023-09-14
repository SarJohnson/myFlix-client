import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx";
import { NavigationBar } from "../navigation-bar/navigation-bar.jsx"
import { ProfileView } from "../profile-view/profile-view.jsx";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    //const [selectedMovie, setSelectedMovie] = useState(null);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser: null);
    const [token, setToken] = useState(storedToken? storedToken: null);
    const onLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.clear();
    }

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
                    id: movie._id,
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

    return(
        <BrowserRouter>
        <NavigationBar
        user={user}
        onLoggedOut={() => {
            setUser(null);
            setToken(null)
        }}
        />
        <Row className="justify-content-md-center">
            <Routes>
                <Route
                path="/signup"
                element={
                    <>
                    {user ? (
                        <Navigate to="/" />
                    ) : (
                        <Col md={5}>
                            <SignupView />
                        </Col>
                    )}
                    </>
                }
                />
                <Route
                path="/login"
                element={
                    <>
                    {user ? (
                        <Navigate to="/" />
                    ) : (
                        <Col md={5}>
                <LoginView 
                onLoggedIn={(user,token) => {
                setUser(user);
                setToken(token);
                }} />
                </Col>
                )}
                </>
            }
            />
            <Route
            path="/profile"
            element={
                <>
                {!user ? (
                    <Navigate to="/login" replace />
                ) : (
                    <Col>
                    <ProfileView
                    user={user}
                    token={token}
                    setUser={setUser}
                    movies={movies}
                    onLogout={onLogout}
                    />
                    </Col>
                )}</>
            }
            />
            <Route
                path="/movies/:movieId"
                element={
                    <>
                    {!user ? (
                        <Navigate to="/login" replace />
                    ) : movies.length === 0 ? (
                        <Col>The list is empty!</Col>
                    ) : (
                        <Col md={8}>
                            <MovieView style={{ border: "1px solid green" }} movies={movies} user={user} setUser={setUser} token={token}/>
                        </Col> 
                    )}
                    </>
                }
                />
                <Route
                path="/"
                element={
                    <>
                    {!user ? (
                        <Navigate to="/login" replace />
                    ) : movies.length === 0 ? (
                        <Col>The list is empty!</Col>
                    ) : (
                        <>
                        {movies.map((movie) => (
                            <Col className="mb-5" key={movie.id} md={3}>
                            <MovieCard  
                            movie={movie} 
                        /> 
                        </Col>
                    ))}
                    </>
                )}
                </>
                }
                />
            </Routes>
            {user && (
                <Col md={1}>
                    <Button
                    className="logout-button"
                    variant="primary"
                    onClick={onLogout}
                    >
                        Logout
                    </Button>
                </Col>
            )}
        </Row>
    </BrowserRouter>
    );
};
