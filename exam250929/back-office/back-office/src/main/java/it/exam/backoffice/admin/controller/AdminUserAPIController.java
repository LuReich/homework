package it.exam.backoffice.admin.controller;

import java.util.Map;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.exam.backoffice.admin.dto.AdminUserSearchDTO;
import it.exam.backoffice.admin.service.AdminUserService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminUserAPIController {

    private final AdminUserService adminUserService;

    @GetMapping("/users")
    public ResponseEntity<Map<String, Object>> getUserList(
            @PageableDefault(size = 10, sort = "createDate", direction = Sort.Direction.DESC) Pageable pageable,
            AdminUserSearchDTO searchDTO) throws Exception {

        Map<String, Object> resultMap = adminUserService.getUserList(pageable, searchDTO);
        return ResponseEntity.ok(resultMap);
    }
}
