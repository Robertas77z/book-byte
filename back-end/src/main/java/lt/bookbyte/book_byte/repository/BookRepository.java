package lt.bookbyte.book_byte.repository;

import lt.bookbyte.book_byte.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface BookRepository extends JpaRepository<Book, Long> {
}
