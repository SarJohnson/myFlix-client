import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import { ModalHeader } from "react-bootstrap";

export const ProfileView = ({ user, token, setUser, movies, onLogout }) => {
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    const [showModal, setShowModal] = useState(false);
    const favoriteMovies = movies.filter((movie) => {
        return user.FavoriteMovies.includes(movie.id)
    });

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch(`https://sarjohnsonmyflix-4f5de10aa490.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                alert("Update failed.")
            }
        }).then((data) => {
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
        })
    };

    const handleDeleteUser = () => {
        fetch(`https://sarjohnsonmyflix-4f5de10aa490.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                onLogout();
            } else {
                alert("something went wrong")
            }
        })
    }

    return (
        <>
        <h2>Profile</h2>
        <Row>
            <Col>
            <div>Username: {user.Username}</div>
            <div>Email: {user.Email}</div>
            </Col>
        </Row>
        <br></br>
        <Row>
            <h2>Update info</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="5"
                    />
                </Form.Group>
                <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </Form.Group>
                <Form.Group controlId="formBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                    />
                </Form.Group>
                <br></br>
                <Button className="update-button" variant="primary" type="submit">Update</Button>
            </Form>
        </Row>
        <br></br>
        <Row>
            <br></br>
            <h2>Favorite movies: </h2>
            {favoriteMovies.map((movie) => (
                <Col className="mb-5" key={movie.id} md={4}>
                    <MovieCard movie={movie}></MovieCard>
                </Col>
            ))}
        </Row>
        <div className="michael">
                <img
                style={{ width: 250, height: 250 }}
                src={require("../images/michael.gif")}
                />
        </div>
        <Button className="delete-button" variant= "primary" onClick={handleShowModal}>
            Kill Switch
        </Button>
        <Modal className="modal" show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Kill Switch</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete your account? This action is permanent.</Modal.Body>
            <Modal.Footer>
                <Button className="delete-button" variant="primary" onClick={handleDeleteUser}>Yes</Button>
                <Button className="delete-button" variant="primary" onClick={handleCloseModal}>No</Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}