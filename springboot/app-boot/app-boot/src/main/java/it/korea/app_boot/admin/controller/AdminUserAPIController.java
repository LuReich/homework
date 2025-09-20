package it.korea.app_boot.admin.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.korea.app_boot.admin.dto.AdminUserDTO;
import it.korea.app_boot.admin.dto.AdminUserSearchDTO;
import it.korea.app_boot.admin.service.AdminUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@Slf4j
public class AdminUserAPIController {

    private final AdminUserService userService;


    @GetMapping("/admin/user")
    public ResponseEntity<Map<String, Object>> getUserList(
        @PageableDefault(page = 0, size = 10, sort = "createDate", direction = Direction.DESC) Pageable pageable,
        AdminUserSearchDTO searchDTO) throws Exception {
       
        Map<String, Object> resultMap = userService.getUserList(pageable, searchDTO);
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @PostMapping("/admin/user")
    public ResponseEntity<Void> createUser(@RequestBody AdminUserDTO userDTO) {
        try {
            userService.createUser(userDTO);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Error creating user: ", e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/admin/user/{userId}")
    public ResponseEntity<Void> updateUser(@PathVariable String userId, @RequestBody AdminUserDTO userDTO) {
        try {
            userService.updateUser(userId, userDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error updating user {}: ", userId, e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/admin/user/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable String userId) {
        try {
            userService.deleteUser(userId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            log.error("Error deleting user {}: ", userId, e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
