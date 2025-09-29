package it.exam.backoffice.board.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class NoticeRequestDTO {
    private String title;
    private String writer;
    private String contents;
    private MultipartFile file;
}
