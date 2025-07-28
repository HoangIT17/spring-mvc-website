package vn.hoidanit.laptopshop.controller.client;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomePageController {
    
    @GetMapping("/")
    public String getHomePage() {
        return "client/homepage/show"; // Assuming you have a JSP file at /WEB-INF/view/client/homepage/show.jsp
    }
}
