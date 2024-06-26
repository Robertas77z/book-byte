package lt.bookbyte.book_byte.repository;

import lt.bookbyte.book_byte.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment,Long> {
}
