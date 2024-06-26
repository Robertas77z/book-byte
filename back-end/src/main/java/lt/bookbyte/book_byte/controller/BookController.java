package lt.bookbyte.book_byte.controller;

import lt.bookbyte.book_byte.dto.BookDTO;
import lt.bookbyte.book_byte.dto.CommentDTO;
import lt.bookbyte.book_byte.entity.Book;
import lt.bookbyte.book_byte.entity.Category;
import lt.bookbyte.book_byte.entity.Comment;
import lt.bookbyte.book_byte.service.BookService;
import lt.bookbyte.book_byte.service.CategoryService;
import lt.bookbyte.book_byte.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;
    private final CategoryService categoryService;

    private final CommentService commentService;

    @Autowired
    public BookController(BookService bookService, CategoryService categoryService, CommentService commentService) {
        this.bookService = bookService;
        this.categoryService = categoryService;
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity<BookDTO> createBook(@RequestBody BookDTO bookDTO) {
        if (bookDTO.getCategoryId() != null) {
            Optional<Category> categoryOptional = categoryService.getCategoryById(bookDTO.getCategoryId());
            if (categoryOptional.isPresent()) {
                Category category = categoryOptional.get();
                Book book = new Book();
                book.setTitle(bookDTO.getTitle());
                book.setDescription(bookDTO.getDescription());
                book.setIsbn(bookDTO.getIsbn());
                book.setImageUrl(bookDTO.getImageUrl());
                book.setPageCount(bookDTO.getPageCount());
                book.setCategory(category);
                Book createdBook = bookService.saveBook(book);
                bookDTO.setId(createdBook.getId());
                return new ResponseEntity<>(bookDTO, HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookDTO> updateBook(@PathVariable Long id, @RequestBody BookDTO bookDTO) {
        Optional<Book> existingBook = bookService.getBookById(id);
        if (existingBook.isPresent()) {
            Book book = existingBook.get();
            book.setTitle(bookDTO.getTitle());
            book.setDescription(bookDTO.getDescription());
            book.setIsbn(bookDTO.getIsbn());
            book.setImageUrl(bookDTO.getImageUrl());
            book.setPageCount(bookDTO.getPageCount());
            if (bookDTO.getCategoryId() != null) {
                Optional<Category> categoryOptional = categoryService.getCategoryById(bookDTO.getCategoryId());
                if (categoryOptional.isPresent()) {
                    Category category = categoryOptional.get();
                    book.setCategory(category);
                } else {
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
            }
            Book updatedBook = bookService.saveBook(book);
            bookDTO.setId(updatedBook.getId());
            return new ResponseEntity<>(bookDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public List<BookDTO> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        return books.stream()
                .map(book -> new BookDTO(
                        book.getId(),
                        book.getTitle(),
                        book.getDescription(),
                        book.getIsbn(),
                        book.getImageUrl(),
                        book.getPageCount(),
                        book.getCategory().getId(),  // categoryId
                        book.getCategory().getName() // categoryName
                ))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Optional<Book> book = bookService.getBookById(id);
        return book.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Book>> getBooksByCategoryId(@PathVariable Long categoryId) {
        List<Book> books = bookService.getBooksByCategoryId(categoryId);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }
    @GetMapping("/{bookId}/comments")
    public ResponseEntity<List<Comment>> getCommentsForBook(@PathVariable Long bookId) {
        Optional<Book> book = bookService.getBookById(bookId);
        if (book.isPresent()) {
            List<Comment> comments = book.get().getComments();
            return new ResponseEntity<>(comments, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/{bookId}/comments")
    public ResponseEntity<Comment> addCommentToBook(@PathVariable Long bookId, @RequestBody CommentDTO commentDTO) {
        Optional<Book> bookOptional = bookService.getBookById(bookId);
        if (bookOptional.isPresent()) {
            Book book = bookOptional.get();

            // Sukuriame Comment objektą iš CommentDTO
            Comment comment = new Comment();
            comment.setContent(commentDTO.getContent());
            // Galite pridėti kitus laukus pagal poreikį

            // Pridedame komentarą prie knygos
            book.addComment(comment);

            // Išsaugome komentarą
            Comment createdComment = commentService.saveComment(comment);

            // Grąžiname sukurtą komentarą ir HTTP statusą CREATED
            return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
        } else {
            // Grąžiname HTTP statusą NOT_FOUND, jei knyga nerasta
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}