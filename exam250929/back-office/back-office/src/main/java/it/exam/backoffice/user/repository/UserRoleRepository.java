package it.exam.backoffice.user.repository;

import it.exam.backoffice.user.entity.UserRoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRoleRepository  extends JpaRepository<UserRoleEntity, String>{

}
