export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director}</span>
            </div>
            <div>
                <span>Subgenre: </span>
                <span>{movie.subgenre}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};