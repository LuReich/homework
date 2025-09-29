package it.exam.backoffice.board.repository;

import it.exam.backoffice.board.entity.NoticeFileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeFileRepository extends JpaRepository<NoticeFileEntity, Integer> {
    
}
