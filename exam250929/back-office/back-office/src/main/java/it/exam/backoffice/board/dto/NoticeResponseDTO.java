package it.exam.backoffice.board.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import it.exam.backoffice.board.entity.NoticeEntity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeResponseDTO {
    private Integer brdId;
    private String title;
    private String writer;
    private String contents;
    private Integer readCount;
    
    private LocalDateTime createDate;
    private LocalDateTime modifiedDate;
    private List<NoticeFileDTO> fileList;

    public NoticeResponseDTO(NoticeEntity noticeEntity) {
        this.brdId = noticeEntity.getBrdId();
        this.title = noticeEntity.getTitle();
        this.writer = noticeEntity.getWriter();
        this.contents = noticeEntity.getContents();
        this.readCount = noticeEntity.getReadCount();
        this.createDate = noticeEntity.getCreateDate();
        this.modifiedDate = noticeEntity.getUpdateDate();
        if (noticeEntity.getFileList() != null) {
            this.fileList = noticeEntity.getFileList().stream()
                    .map(NoticeFileDTO::of)
                    .collect(Collectors.toList());
        }
    }
}
