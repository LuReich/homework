package it.exam.backoffice.board.controller;

import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.exam.backoffice.board.dto.NoticeRequestDTO;
import it.exam.backoffice.board.dto.NoticeResponseDTO;
import it.exam.backoffice.board.entity.NoticeEntity;
import it.exam.backoffice.board.service.NoticeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class NoticeAPIController {

    private final NoticeService noticeService;

    @GetMapping("/board")
    public ResponseEntity<Page<NoticeResponseDTO>> getAllNotices(
            @PageableDefault(size = 10, sort = "brdId", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<NoticeEntity> notices = noticeService.getAllNotices(pageable);
        Page<NoticeResponseDTO> noticeResponseDTOs = notices.map(NoticeResponseDTO::new);
        return ResponseEntity.ok(noticeResponseDTOs);
    }

    @GetMapping("/board/{brdId}")
    public ResponseEntity<NoticeResponseDTO> getNoticeById(@PathVariable("brdId") Integer brdId) {
        try {
            NoticeEntity notice = noticeService.getNoticeById(brdId);
            return ResponseEntity.ok(new NoticeResponseDTO(notice));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/board")
    public ResponseEntity<NoticeResponseDTO> createNotice(@ModelAttribute NoticeRequestDTO requestDto)
            throws Exception {
        NoticeEntity createdNotice = noticeService.createNotice(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new NoticeResponseDTO(createdNotice));
    }

    @PutMapping("/board/{brdId}")
    public ResponseEntity<NoticeResponseDTO> updateNotice(@PathVariable("brdId") Integer brdId,
            @Valid @ModelAttribute NoticeRequestDTO requestDto) throws Exception {
        try {
            NoticeEntity updatedNotice = noticeService.updateNotice(brdId, requestDto);
            return ResponseEntity.ok(new NoticeResponseDTO(updatedNotice));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/board/{brdId}")
    public ResponseEntity<Void> deleteNotice(@PathVariable("brdId") Integer brdId) throws Exception {
        try {
            noticeService.deleteNotice(brdId);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/board/file/{bfId}")
    public ResponseEntity<Map<String, Object>> deleteFile(@PathVariable("bfId") int bfId) throws Exception {
        Map<String, Object> resultMap = noticeService.deleteFile(bfId);
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @GetMapping("/board/file/{bfId}")
    public ResponseEntity<Resource> downFile(@PathVariable("bfId") int bfId) throws Exception {
        return noticeService.downLoadFile(bfId);
    }
}
