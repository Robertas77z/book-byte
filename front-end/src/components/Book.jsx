import React, { useState, useEffect } from 'react';
import { getBooksAPICall } from '../services/BookService';
import BookCard from './BookCard';

const Book = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const booksResponse = await getBooksAPICall();
            console.log("Gauti knygų duomenys:", booksResponse.data);
            setBooks(booksResponse.data);
        } catch (error) {
            console.error("Klaida gaunant duomenis:", error);
        }
    };

    return (
        <div>
            <h3>Knygos</h3>
            {books.map(book => (
                <BookCard key={book.id} book={book} />
            ))}
        </div>
    );
};

export default Book;
