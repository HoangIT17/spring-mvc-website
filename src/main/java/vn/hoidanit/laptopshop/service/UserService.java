package vn.hoidanit.laptopshop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import vn.hoidanit.laptopshop.domain.User;
import vn.hoidanit.laptopshop.repository.UserRepository;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String handleHello() {
        return "Hello from Service";
    }

    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    public List<User> getAllUsersByEmail(String name) {
        // Logic to find users by name
        return this.userRepository.findOneByEmail(name); // Placeholder for actual implementation
    }

    public User handleSaveUser(User user) {
        // Logic to save user
        User hoangit = this.userRepository.save(user);
        // System.out.println(hoangit);
        return hoangit;
    }
}
