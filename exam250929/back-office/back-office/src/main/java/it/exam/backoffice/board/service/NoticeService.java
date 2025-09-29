package it.exam.backoffice.board.service;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.exam.backoffice.board.dto.NoticeRequestDTO;
import it.exam.backoffice.board.entity.NoticeEntity;
import it.exam.backoffice.board.entity.NoticeFileEntity;
import it.exam.backoffice.board.repository.NoticeFileRepository;
import it.exam.backoffice.board.repository.NoticeRepository;
import it.exam.backoffice.common.utils.FileUtils;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NoticeService {

    @Value("${server.file.upload.path}")
    private String filePath;

    private final NoticeRepository noticeRepository;
    private final NoticeFileRepository noticeFileRepository;
    private final FileUtils fileUtils;

    @Transactional(readOnly = true)
    public Page<NoticeEntity> getAllNotices(Pageable pageable) {
        return noticeRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public NoticeEntity getNoticeById(Integer brdId) {
        NoticeEntity notice = noticeRepository.findById(brdId)
                .orElseThrow(() -> new NoSuchElementException("Notice not found with id: " + brdId));
        
        // Explicitly initialize the fileList within the session
        notice.getFileList().size(); // Accessing the size forces initialization
        return notice;
    }

    @Transactional
    public void incrementReadCount(Integer brdId) {
        // 조회수만 증가 (네이티브 쿼리로 updateDate 변경 방지)
        noticeRepository.incrementReadCount(brdId);
    }

    @Transactional
    public NoticeEntity createNotice(NoticeRequestDTO requestDto) throws Exception {
        NoticeEntity notice = new NoticeEntity();
        notice.setTitle(requestDto.getTitle());
        notice.setWriter(requestDto.getWriter());
        notice.setContents(requestDto.getContents());

        if (requestDto.getFile() != null && !requestDto.getFile().isEmpty()) {
            Map<String, Object> fileMap = fileUtils.uploadFiles(requestDto.getFile(), filePath);
            if (fileMap != null) {
                NoticeFileEntity fileEntity = new NoticeFileEntity();
                fileEntity.setFileName(fileMap.get("fileName").toString());
                fileEntity.setStoredName(fileMap.get("storedFileName").toString());
                fileEntity.setFilePath(fileMap.get("filePath").toString());
                fileEntity.setFileSize(requestDto.getFile().getSize());
                notice.addFiles(fileEntity);
            }
        }
        return noticeRepository.save(notice);
    }

    @Transactional
    public NoticeEntity updateNotice(Integer brdId, NoticeRequestDTO requestDto) throws Exception {
        NoticeEntity existingNotice = noticeRepository.findById(brdId)
                .orElseThrow(() -> new NoSuchElementException("Notice not found with id: " + brdId));

        existingNotice.setTitle(requestDto.getTitle());
        existingNotice.setWriter(requestDto.getWriter());
        existingNotice.setContents(requestDto.getContents());

        if (requestDto.getFile() != null && !requestDto.getFile().isEmpty()) {
            // Delete old files
            if (existingNotice.getFileList() != null && !existingNotice.getFileList().isEmpty()) {
                for (NoticeFileEntity fileEntity : existingNotice.getFileList()) {
                    String oldFilePath = fileEntity.getFilePath() + fileEntity.getStoredName();
                    fileUtils.deleteFile(oldFilePath);
                }
                existingNotice.getFileList().clear();
            }

            // Upload new file
            Map<String, Object> fileMap = fileUtils.uploadFiles(requestDto.getFile(), filePath);
            if (fileMap != null) {
                NoticeFileEntity fileEntity = new NoticeFileEntity();
                fileEntity.setFileName(fileMap.get("fileName").toString());
                fileEntity.setStoredName(fileMap.get("storedFileName").toString());
                fileEntity.setFilePath(fileMap.get("filePath").toString());
                fileEntity.setFileSize(requestDto.getFile().getSize());
                existingNotice.addFiles(fileEntity);
            } else {
                throw new RuntimeException("파일 업로드 실패");
            }
        }
        return noticeRepository.save(existingNotice);
    }

    @Transactional
    public void deleteNotice(Integer brdId) throws Exception {
        NoticeEntity notice = noticeRepository.findById(brdId)
                .orElseThrow(() -> new NoSuchElementException("Notice not found with id: " + brdId));

        if (notice.getFileList() != null && !notice.getFileList().isEmpty()) {
            for (NoticeFileEntity fileEntity : notice.getFileList()) {
                String oldFilePath = fileEntity.getFilePath() + fileEntity.getStoredName();
                fileUtils.deleteFile(oldFilePath);
            }
        }
        noticeRepository.delete(notice);
    }

    @Transactional
    public Map<String, Object> deleteFile(int bfId) throws Exception {
        NoticeFileEntity fileEntity = noticeFileRepository.findById(bfId)
                .orElseThrow(() -> new NoSuchElementException("파일정보 없음"));

        noticeFileRepository.delete(fileEntity);

        String oldFilePath = fileEntity.getFilePath() + fileEntity.getStoredName();
        fileUtils.deleteFile(oldFilePath);

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("resultCode", 200);
        resultMap.put("resultMsg", "OK");
        return resultMap;
    }

    public ResponseEntity<Resource> downLoadFile(int bfId) throws Exception {
        HttpHeaders header = new HttpHeaders();
        Resource resource = null;

        NoticeFileEntity fileEntity = noticeFileRepository.findById(bfId)
                .orElseThrow(() -> new NoSuchElementException("파일정보 없음"));

        String fullPath = fileEntity.getFilePath() + fileEntity.getStoredName();
        String fileName = fileEntity.getFileName();

        File f = new File(fullPath);

        if (!f.exists()) {
            throw new NoSuchElementException("파일정보 없음");
        }

        String mimeType = Files.probeContentType(Paths.get(f.getAbsolutePath()));

        if (mimeType == null) {
            mimeType = "application/octet-stream";
        }
        resource = new FileSystemResource(f);

        header.setContentDisposition(
                ContentDisposition
                        .builder("attachment")
                        .filename(fileName, StandardCharsets.UTF_8)
                        .build());

        header.setContentType(MediaType.parseMediaType(mimeType));
        header.setContentLength(fileEntity.getFileSize());
        

        header.setCacheControl("no-cache, no-store, must-revalidate");
        header.set("Pragma", "no-cache");
        header.set("Expires", "0");

        return new ResponseEntity<>(resource, header, HttpStatus.OK);
    }
}
