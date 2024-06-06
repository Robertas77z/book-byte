package lt.bookbyte.book_byte.repository;

import lt.bookbyte.book_byte.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface CategoryRepository extends JpaRepository <Category, Long>{
}
