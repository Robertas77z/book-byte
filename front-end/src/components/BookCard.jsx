import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "../styles/Book-style.css";

const BookCard = ({ book, onToggleFavorite }) => {
  const [rating, setRating] = useState(book.rating || 0); // Initial rating from the book object, default to 0 if not provided

  const handleStarClick = (starRating) => {
    setRating(starRating);
    // You can also send the rating to the backend here if needed
  };

  // Function to render the star rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? "star-filled" : "star-empty"}
          onClick={() => handleStarClick(i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="card">
      <div>
        <button onClick={() => onToggleFavorite(book.id)} className="heart-button">
          {book.favorite ? "❤️" : "🖤"}
        </button>
        <div className="star-rating">{renderStars()}</div>
      </div>
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">Aprašymas: {book.description}</p>
        <p className="card-text">ISBN: {book.isbn}</p>
        <p className="card-text">Puslapių skaičius: {book.pageCount}</p>
        {book.categoryName && (
          <p className="card-text">Kategorija: {book.categoryName}</p>
        )}
        <img
          src={book.imageUrl}
          alt={book.title}
          className="img-fluid img-small"
        />
      </div>
      <Link to={`/book/${book.id}`} className="more-link">
       <p className="b-c-b-s">Rašyti komentarą</p> 
      </Link>
    </div>
  );
};

export default BookCard;
