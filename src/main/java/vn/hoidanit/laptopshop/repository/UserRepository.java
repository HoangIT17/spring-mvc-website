package vn.hoidanit.laptopshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vn.hoidanit.laptopshop.domain.User;



//crud: create, r: read, u: update, d: delete
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User save(User hoangit);
    List<User> findOneByEmail(String email);
    
}
