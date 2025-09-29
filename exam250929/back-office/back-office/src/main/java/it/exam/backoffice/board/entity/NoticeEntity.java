package it.exam.backoffice.board.entity;

import it.exam.backoffice.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tb_notice")
@Getter
@Setter
public class NoticeEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "brd_id", nullable = false)
    private Integer brdId;

    @Column(name = "title", nullable = false, length = 100)
    private String title;

    @Column(name = "writer", nullable = false, length = 50)
    private String writer;

    @Column(name = "contents", nullable = false, columnDefinition = "TEXT")
    private String contents;

    @Column(name = "read_count", nullable = false)
    private Integer readCount = 0;

    @OneToMany(mappedBy = "noticeEntity", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<NoticeFileEntity> fileList = new ArrayList<>();

    public void addFiles(NoticeFileEntity fileEntity) {
        fileList.add(fileEntity);
        fileEntity.setNoticeEntity(this);
    }

}
