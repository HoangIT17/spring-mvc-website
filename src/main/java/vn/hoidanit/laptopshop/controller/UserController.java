package vn.hoidanit.laptopshop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.hoidanit.laptopshop.service.UserService;

@Controller
public class UserController {
    
    //DI: Dependency Injection
    private UserService userService;
    
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping("/")
    public String getHomePage() {
        String test = this.userService.handleHello();
        return "hello"; // Assuming you have a home.html template
    }
}

// @RestController
// public class UserController {
    
//     //DI: Dependency Injection
//     private UserService userService;
    
//     public UserController(UserService userService) {
//         this.userService = userService;
//     }


//     @RequestMapping("/")
//     public String getHomePage() {
//         return this.userService.handleHello(); // Assuming you have a home.html template
//     }
// }