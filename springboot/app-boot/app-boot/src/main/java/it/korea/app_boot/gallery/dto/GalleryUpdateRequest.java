package it.korea.app_boot.gallery.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

/**
 * 갤러리 수정을 위한 요청 데이터를 담는 DTO
 */
@Getter
@Setter
public class GalleryUpdateRequest {
    private String nums;
    private String title;
    private MultipartFile file;
}
