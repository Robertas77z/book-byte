import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById } from '../services/BookService';
import { getCommentsForBook, addCommentToBook, deleteComment } from '../services/commentService';
import "../styles/CurrentBook-style.css";
import { FaTrash } from 'react-icons/fa'; // Importuojame React ikoną
import CustomHeader from './CustomHeader';
import Footer from './Footer';

const CurrentBookCard = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');


  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookById(id);
        setBook(response.data);
      } catch (error) {
        console.error('Klaida gaunant knygą:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await getCommentsForBook(id);
        setComments(response);
      } catch (error) {
        console.error('Klaida gaunant komentarus:', error);
      }
    };

    fetchBook();
    fetchComments();
  }, [id]);

  const handleAddComment = async () => {
    if (newComment.trim() === '') return;

    try {
      const addedComment = await addCommentToBook(id, newComment);
      setComments([...comments, addedComment]);
      setNewComment('');
    } catch (error) {
      console.error('Klaida pridedant komentarą:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Klaida trinant komentarą:', error);
    }
  };

  if (!book) return null;

  return (
    <div>
      <CustomHeader />
      <div className="book-details-container">
        <div className="current-book-card">
          <h2>{book.title}</h2>
          <p>Aprašymas: {book.description}</p>
          <p>ISBN: {book.isbn}</p>
          <p>Puslapių skaičius: {book.pageCount}</p>
          {book.categoryName && <p>Kategorija: {book.categoryName}</p>}
          <img src={book.imageUrl} alt={book.title} className="img-fluid img-large" />
        </div>
        <div className="book-details">
          <h3>Komentarai</h3>
          <textarea
            rows="4"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Įveskite savo komentarą čia..."
          />
          <button className="add-comment-btn" onClick={handleAddComment}>Pridėti komentarą</button>
          <div className="comments-list">
            {comments.map(comment => (
              <div key={comment.id} className="comment">
                <p className="comment-content">{comment.content}</p>
                <div className="delete-comment">
                  <button onClick={() => handleDeleteComment(comment.id)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default CurrentBookCard;
