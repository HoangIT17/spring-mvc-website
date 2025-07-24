package vn.hoidanit.laptopshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vn.hoidanit.laptopshop.domain.User;



//crud: create, r: read, u: update, d: delete
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User save(User hoangit);

    void deleteById(long id); // This method should be used to delete a user by their ID

    List<User> findOneByEmail(String email);

    List<User> findAll(); // This method is not typically needed, as findAll() without parameters is sufficient for fetching all users.
    
    User findById(long id); // This method should be used to find a user by their ID
}
