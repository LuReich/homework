package it.exam.backoffice.board.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import it.exam.backoffice.board.entity.NoticeFileEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class NoticeFileDTO {

    private int bfId;
    private String fileName;
    private String storedName;
    private String filePath;
    private Long fileSize;
    private LocalDateTime createDate;


    public static  NoticeFileDTO of(NoticeFileEntity entity) {
        return NoticeFileDTO
              .builder()
              .bfId(entity.getBfId())
              .fileName(entity.getFileName())
              .storedName(entity.getStoredName())
              .filePath(entity.getFilePath())
              .fileSize(entity.getFileSize())
              .createDate(entity.getCreateDate())
              .build();
    }
}