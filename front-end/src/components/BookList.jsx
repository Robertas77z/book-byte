import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books, onToggleFavorite }) => {
  return (
    <div className="book-list">
      {books.map((book) => (
        <div key={book.id}>
          <BookCard book={book} onToggleFavorite={onToggleFavorite} />
        </div>
      ))}
    </div>
  );
};

export default BookList;
