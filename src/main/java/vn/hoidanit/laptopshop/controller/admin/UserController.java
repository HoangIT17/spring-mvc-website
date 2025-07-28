package vn.hoidanit.laptopshop.controller.admin;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import vn.hoidanit.laptopshop.domain.User;
import vn.hoidanit.laptopshop.service.UploadService;
import vn.hoidanit.laptopshop.service.UserService;


@Controller
public class UserController {
    
    //DI: Dependency Injection
    private final UserService userService;
    private final UploadService uploadService;
    private final PasswordEncoder passwordEncoder;
    
    public UserController(UserService userService, UploadService uploadService, 
    PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.uploadService = uploadService;
        this.passwordEncoder = passwordEncoder;
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
        List<User> users = this.userService.getAllUsers();
        model.addAttribute("users1", users);      
        return "admin/user/show"; // Assuming you have a home.html template
    }

    //Update user details
    @RequestMapping("/admin/user/{id}") //Method GET
    public String getUserDetailsPage(Model model, @PathVariable long id) {
        // System.out.println("Check path id: " + id);
        User user = this.userService.getUserById(id);
        model.addAttribute("user", user);
        model.addAttribute("id", id);
        return "admin/user/detail"; // Assuming you have a home.html template
    }

    @GetMapping("/admin/user/create") //Method GET
    public String getCreateUserPage(Model model) {
        model.addAttribute("newUser", new User());
        return "admin/user/create"; // Assuming you have a home.html template
    }

    @PostMapping(value = "/admin/user/create")
    public String createUserPage(Model model, 
        @ModelAttribute("newUser") User hoangit, 
        @RequestParam("hoangitFile") MultipartFile file) {
            
        String avatar = this.uploadService.handleUploadFile(file, "avatar");
        String hashPassword = this.passwordEncoder.encode(hoangit.getPassword());

        hoangit.setAvatar(avatar);
        hoangit.setPassword(hashPassword);
        hoangit.setRole(this.userService.getRoleByName(hoangit.getRole().getName()));
        
        //save
        this.userService.handleSaveUser(hoangit);
        return "redirect:/admin/user"; // Assuming you have a home.html template
    }

    @RequestMapping("/admin/user/update/{id}") //Method GET
    public String getUpdateUserPage(Model model, @PathVariable long id) {
        User currentUser = this.userService.getUserById(id);
        model.addAttribute("newUser", currentUser);
        return "admin/user/update"; // Assuming you have a home.html template
    }

    @PostMapping("/admin/user/update")
    public String postUpdateUser(Model model, @ModelAttribute("newUser") User hoangit) {
        User currentUser = this.userService.getUserById(hoangit.getId());

        if (currentUser != null) {
            currentUser.setFullName(hoangit.getFullName());
            currentUser.setPhone(hoangit.getPhone());
            currentUser.setAddress(hoangit.getAddress());
            // Add role update
            currentUser.setRole(this.userService.getRoleByName(hoangit.getRole().getName()));

            this.userService.handleSaveUser(currentUser);
        }
        return "redirect:/admin/user"; // Assuming you have a home.html template
    }

    @GetMapping("/admin/user/delete/{id}")
    public String getDeleteUserPage(Model model, @PathVariable long id) {
        model.addAttribute("id", id);
        // User user = new User();
        // user.setId(id);
        model.addAttribute("newUser", new User());
        return "admin/user/delete"; // Assuming you have a home.html template
    }

    @PostMapping("/admin/user/delete")
    public String postDeleteUser(Model model, @ModelAttribute("newUser") User hoangit) {
        this.userService.deleteAUser(hoangit.getId());
        return "redirect:/admin/user"; // Assuming  you have a home.html template
    }


}
