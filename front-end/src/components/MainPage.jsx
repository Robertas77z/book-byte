import React, { useState, useEffect } from 'react';
import Header from './Header';
import SideBar from './SideBar';
import BookCard from './BookCard';
import { getBooksAPICall } from '../services/BookService';
import { getCategoriesAPICall } from '../services/CategoryService';
import "../styles/Book-style.css";
import Footer from './Footer';

const MainPage = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [showFavorites, setShowFavorites] = useState(false); // Būsena, ar rodyti tik mėgstamas knygas
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBooksAndCategories();
  }, []);

  const fetchBooksAndCategories = async () => {
    try {
      const booksResponse = await getBooksAPICall();
      const categoriesResponse = await getCategoriesAPICall();

      console.log("Gauti knygų duomenys:", booksResponse.data);
      console.log("Gauti kategorijų duomenys:", categoriesResponse.data);

      // Pridedame atributą 'favorite' kiekvienai knygai
      const booksWithFavorites = booksResponse.data.map(book => ({
        ...book,
        favorite: false // Pradinė būsena: neįsiminta knyga
      }));

      setBooks(booksWithFavorites);
      setCategories(categoriesResponse.data);
    } catch (error) {
      console.error("Klaida gaunant duomenis:", error);
    }
  };

  const toggleFavorite = (bookId) => {
    setBooks(books.map(book => 
      book.id === bookId ? { ...book, favorite: !book.favorite } : book
    ));
  };

  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites); // Pakeičiame būseną, ar rodyti tik mėgstamas knygas
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  // Filtruojame knygas pagal įvestą paieškos terminą
  const filteredBooksBySearchTerm = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBooks = selectedCategory ? filteredBooksBySearchTerm.filter(book => book.categoryId === selectedCategory) : filteredBooksBySearchTerm;
  
  const favoriteBooks = filteredBooksBySearchTerm.filter(book => book.favorite); // Filtruojame tik mėgstamas knygas

  // Rodyti mėgstamas knygas, jei yra įjungta parinktis rodyti tik mėgstamas
  const booksToShow = showFavorites ? favoriteBooks : filteredBooks;

  return (
    <>
      <Header onShowFavorites={handleShowFavorites} onSearch={handleSearch} /> {/* Pridedame funkciją rodyti tik mėgstamas knygas */}
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <SideBar setSelectedCategory={setSelectedCategory} />
          </div>
          <div className="col-md-9">
            <div>
              <h3>Knygos</h3>
              <div className="book-card-container"> {/* Pridedame konteinerio klasę */}
                {booksToShow.map(book => (
                  <BookCard key={book.id} book={book} onToggleFavorite={toggleFavorite} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default MainPage;
