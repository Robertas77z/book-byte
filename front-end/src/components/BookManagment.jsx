import React, { useState, useEffect } from "react";
import {
  createBookAPICall,
  updateBookAPICall,
  deleteBookAPICall,
  getBooksAPICall,
} from "../services/BookService";
import { getCategoriesAPICall } from "../services/CategoryService";
import BookCard from "./BookCard";
import "../styles/BookManagment-style.css";

const BookManagement = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [bookImageUrl, setBookImageUrl] = useState("");
  const [bookIsbn, setBookIsbn] = useState("");
  const [bookPageCount, setBookPageCount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingBookId, setEditingBookId] = useState(null);

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await getBooksAPICall();
      console.log("Gauti knygų duomenys:", response.data);
      setBooks(response.data);
    } catch (error) {
      console.error("Klaida gaunant knygas:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategoriesAPICall();
      console.log("Gauti kategorijų duomenys:", response.data);
      setCategories(response.data);
    } catch (error) {
      console.error("Klaida gaunant kategorijas:", error);
    }
  };

  //   const getCategoryNameForBook = (book) => {
  //     const category = categories.find((cat) =>
  //       cat.books.some((b) => b.id === book.id)
  //     );
  //     return category ? category.name : "Nenurodyta";
  //   };

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    const bookData = {
      title: bookTitle,
      description: bookDescription,
      isbn: bookIsbn,
      imageUrl: bookImageUrl,
      pageCount: bookPageCount,
      categoryId: selectedCategory,
    };

    if (editingBookId) {
      try {
        await updateBookAPICall(editingBookId, bookData);
        console.log("Knyga atnaujinta sėkmingai");
        fetchCategories();
        fetchBooks();
        resetFormFields();
      } catch (error) {
        console.error("Klaida atnaujinant knygą:", error);
      }
    } else {
      try {
        await createBookAPICall(bookData);
        console.log("Knyga sukurta sėkmingai");
        fetchCategories();
        fetchBooks();
        resetFormFields();
      } catch (error) {
        console.error("Klaida kuriant knygą:", error);
      }
    }
  };

  const resetFormFields = () => {
    setBookTitle("");
    setBookDescription("");
    setBookImageUrl("");
    setBookIsbn("");
    setBookPageCount("");
    setSelectedCategory("");
    setEditingBookId(null);
  };

  const handleEditBook = (book) => {
    setEditingBookId(book.id);
    setBookTitle(book.title || "");
    setBookDescription(book.description || "");
    setBookImageUrl(book.imageUrl || "");
    setBookIsbn(book.isbn || "");
    setBookPageCount(book.pageCount || "");
    setSelectedCategory(book.categoryId);
  };

  const handleDeleteBook = async (id) => {
    try {
      await deleteBookAPICall(id);
      setBooks(books.filter((book) => book.id !== id));
      console.log("Knyga ištrinta sėkmingai");
    } catch (error) {
      console.error("Klaida trinant knygą:", error);
    }
  };

  return (
    <div>
      <h2 className="mng-h2">Knygų valdymas</h2>
      <div className="mng-main">
        <form onSubmit={handleBookSubmit} className="mng-form">
          <div className="mb-3">
            <label className="form-label">Knygos pavadinimas</label>
            <input
              type="text"
              className="form-control"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Aprašymas</label>
            <input
              type="text"
              className="form-control"
              value={bookDescription}
              onChange={(e) => setBookDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Paveiksliuko URL</label>
            <input
              type="text"
              className="form-control"
              value={bookImageUrl}
              onChange={(e) => setBookImageUrl(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">ISBN</label>
            <input
              type="text"
              className="form-control"
              value={bookIsbn}
              onChange={(e) => setBookIsbn(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Puslapių skaičius</label>
            <input
              type="number"
              className="form-control"
              value={bookPageCount}
              onChange={(e) => setBookPageCount(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Kategorija</label>
            <select
              className="form-control"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Pasirinkite kategoriją</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Sukurti/Redaguoti
          </button>
          <div className="mng-back">
            <a href="http://localhost:3000/admin" >Grįžti atgal</a>
        </div>
        </form>
        <div className="mng-cards-container">
          {books.map((book) => (
            <div key={book.id} className="mng-card">
              <BookCard book={book} />
              <div>
                <button onClick={() => handleEditBook(book)} className="btn btn-primary" id="mng-btn-s">Redaguoti</button>
                <button onClick={() => handleDeleteBook(book.id)} className="btn btn-danger" id="mng-btn-d">
                  Ištrinti
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookManagement;
