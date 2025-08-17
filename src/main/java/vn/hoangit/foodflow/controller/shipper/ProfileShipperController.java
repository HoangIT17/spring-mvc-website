package vn.hoangit.foodflow.controller.shipper;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import vn.hoangit.foodflow.domain.User;
import vn.hoangit.foodflow.service.UserService;

@Controller
public class ProfileShipperController {

    private final UserService userService;

    public ProfileShipperController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/shipper/profile")
    public String showProfile(Model model, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        Long id = (Long) (session != null ? session.getAttribute("id") : null);
        User user = id != null ? userService.getUserById(id) : null;
        model.addAttribute("user", user);
        return "shipper/profile/show";
    }

    @PostMapping("/shipper/profile/location")
    public String updateLocation(@RequestParam("latitude") Double latitude,
        @RequestParam("longitude") Double longitude,
        HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        Long id = (Long) (session != null ? session.getAttribute("id") : null);
        if (id != null) {
            User user = userService.getUserById(id);
            if (user != null) {
                user.setLatitude(latitude);
                user.setLongitude(longitude);
                userService.handleSaveUser(user);
            }
        }
        return "redirect:/shipper/profile";
    }
}


