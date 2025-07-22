package vn.hoidanit.laptopshop.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import vn.hoidanit.laptopshop.domain.User;
import vn.hoidanit.laptopshop.service.UserService;

@Controller
public class UserController {
    
    //DI: Dependency Injection
    private final UserService userService;
    
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping("/")
    public String getHomePage(Model model) {
        List<User> arrUsers = this.userService.getAllUsersByEmail("Hpham172002@gmail.com");
        System.out.println(arrUsers);


        model.addAttribute("hoangit","test");
        model.addAttribute("hoidanit", "From Controller with Model");
        return "hello"; // Assuming you have a home.html template
    }

    @RequestMapping("/admin/user") //Method GET
    public String getUserPage(Model model) {
        // String test = this.userService.handleHello();
        // model.addAttribute("newUser", new User());
        // model.addAttribute("hoidanit", "From Controller with Model");
        return "admin/user/table-user"; // Assuming you have a home.html template
    }

    @RequestMapping(value = "/admin/user/create")
    public String getCreateUserPage(Model model) {
        model.addAttribute("newUser", new User());
        return "admin/user/create"; // Assuming you have a home.html template
    }

    @RequestMapping(value = "/admin/user/create", method = RequestMethod.POST)
    public String createUserPage(Model model, @ModelAttribute("newUser") User hoangit) {
        System.out.println("run here" + hoangit);
        this.userService.handleSaveUser(hoangit);
        return "hello"; // Assuming you have a home.html template
    }
}
