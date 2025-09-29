package it.exam.backoffice.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import it.exam.backoffice.board.entity.NoticeEntity;

@Repository
public interface NoticeRepository extends JpaRepository<NoticeEntity, Integer> {
    
    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE tb_notice SET read_count = read_count + 1 WHERE brd_id = :brdId", nativeQuery = true)
    void incrementReadCount(@Param("brdId") Integer brdId);
}
