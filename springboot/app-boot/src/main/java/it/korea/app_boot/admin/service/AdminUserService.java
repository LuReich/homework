package it.korea.app_boot.admin.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.korea.app_boot.admin.dto.AdminUserDTO;
import it.korea.app_boot.admin.dto.AdminUserProjection;
import it.korea.app_boot.admin.dto.AdminUserSearchDTO;
import it.korea.app_boot.common.dto.PageVO;
import it.korea.app_boot.user.entity.UserEntity;
import it.korea.app_boot.user.repository.UserRepository;
import it.korea.app_boot.user.repository.UserRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@RequiredArgsConstructor
public class AdminUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRoleRepository userRoleRepository;

    @Transactional
    public Map<String, Object> getUserList(Pageable pageable) throws Exception {
         Map<String, Object> resultMap = new HashMap<>();

         Page<UserEntity> pageList = 
                userRepository.findAll(pageable);

         
         List<AdminUserDTO> list = pageList.getContent()
                    .stream().map(AdminUserDTO::of).toList();

        PageVO pageVO = new PageVO();
        pageVO.setData(pageList.getNumber(), (int)pageList.getTotalElements());

        resultMap.put("total", pageList.getTotalElements());
        resultMap.put("content", list);
        resultMap.put("pageHTML", pageVO.pageHTML());
        resultMap.put("page", pageList.getNumber());

         return resultMap;
    }

    @Transactional
    public Map<String, Object> getUserList(Pageable pageable, AdminUserSearchDTO searchDTO) throws Exception {
         Map<String, Object> resultMap = new HashMap<>();

         Page<UserEntity> pageList =  null;

         if(StringUtils.isNotBlank(searchDTO.getSearchText())){
            pageList = userRepository
              .findByUserIdContainingOrUserNameContaining(searchDTO.getSearchText(),searchDTO.getSearchText(), pageable );
         }else {
            pageList = userRepository.findAll(pageable);
         }

            
         List<AdminUserDTO> list = pageList.getContent()
                    .stream().map(AdminUserDTO::of).toList();

        PageVO pageVO = new PageVO();
        pageVO.setData(pageList.getNumber(), (int)pageList.getTotalElements());

        resultMap.put("total", pageList.getTotalElements());
        resultMap.put("content", list);
        resultMap.put("pageHTML", pageVO.pageHTML());
        resultMap.put("page", pageList.getNumber());

         return resultMap;
    }


    @Transactional
     public  AdminUserDTO getUser(String userId) throws Exception {
         AdminUserProjection user = userRepository
                .getUserById(userId).orElseThrow(() -> new RuntimeException("사용자없음"));
      
         return AdminUserDTO.of(user);
     }

    @Transactional
    public void createUser(AdminUserDTO userDTO) {
        if (userRepository.existsById(userDTO.getUserId())) {
            throw new RuntimeException("이미 존재하는 아이디입니다.");
        }
        UserEntity userEntity = new UserEntity();
        userEntity.setUserId(userDTO.getUserId());
        userEntity.setPasswd(passwordEncoder.encode(userDTO.getPasswd()));
        userEntity.setUserName(userDTO.getUserName());
        userEntity.setBirth(userDTO.getBirth());
        userEntity.setGender(userDTO.getGender());
        userEntity.setPhone(userDTO.getPhone());
        userEntity.setEmail(userDTO.getEmail());
        userEntity.setAddr(userDTO.getAddr());
        userEntity.setAddrDetail(userDTO.getAddrDetail());
        userEntity.setUseYn("Y");
        userEntity.setDelYn("N");
        userRoleRepository.findByRoleId("USER").ifPresent(userEntity::setRole);
        
        userRepository.save(userEntity);
    }

    @Transactional
    public void updateUser(String userId, AdminUserDTO userDTO) {
        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // 이름, 전화번호, 이메일, 주소, 역할, 사용 여부 업데이트
        userEntity.setUserName(userDTO.getUserName());
        userEntity.setPhone(userDTO.getPhone());
        userEntity.setEmail(userDTO.getEmail());
        userEntity.setAddr(userDTO.getAddr());
        userEntity.setAddrDetail(userDTO.getAddrDetail());
        // userEntity.setUserRole(userDTO.getUserRole()); // 역할 변경 로직 필요 시 추가
        userEntity.setUseYn(userDTO.getUseYn());

        // 비밀번호가 제공된 경우에만 업데이트
        if (StringUtils.isNotBlank(userDTO.getPasswd())) {
            userEntity.setPasswd(passwordEncoder.encode(userDTO.getPasswd()));
        }

        userRepository.save(userEntity);
    }

    @Transactional
    public void deleteUser(String userId) {
        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        userEntity.setDelYn("Y");
        userRepository.save(userEntity);
    }
}
