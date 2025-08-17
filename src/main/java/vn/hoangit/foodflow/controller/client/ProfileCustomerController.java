package vn.hoangit.foodflow.controller.client;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import vn.hoangit.foodflow.domain.User;
import vn.hoangit.foodflow.service.UploadService;
import vn.hoangit.foodflow.service.UserService;

@Controller
public class ProfileCustomerController {

    private final UserService userService;
    private final UploadService uploadService;

    public ProfileCustomerController(UserService userService, UploadService uploadService) {
        this.userService = userService;
        this.uploadService = uploadService;
    }

    @GetMapping("/profile")
    public String showProfile(Model model, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("id") == null) {
            return "redirect:/login";
        }
        
        Long id = (Long) session.getAttribute("id");
        User user = userService.getUserById(id);
        model.addAttribute("user", user);
        return "client/profile/show";
    }

    @PostMapping("/profile/update")
    public String updateProfile(@RequestParam("fullName") String fullName,
        @RequestParam("address") String address,
        @RequestParam(value = "avatarFile", required = false) MultipartFile avatarFile,
        HttpServletRequest request,
        RedirectAttributes redirectAttributes) {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("id") == null) {
            return "redirect:/login";
        }
        
        // Validation
        if (fullName == null || fullName.trim().isEmpty()) {
            redirectAttributes.addFlashAttribute("error", "Họ và tên không được để trống");
            return "redirect:/profile";
        }
        
        if (address == null || address.trim().isEmpty()) {
            redirectAttributes.addFlashAttribute("error", "Địa chỉ không được để trống");
            return "redirect:/profile";
        }
        
        // Validate avatar file if provided
        if (avatarFile != null && !avatarFile.isEmpty()) {
            if (!avatarFile.getContentType().startsWith("image/")) {
                redirectAttributes.addFlashAttribute("error", "Chỉ chấp nhận file ảnh");
                return "redirect:/profile";
            }
            
            if (avatarFile.getSize() > 5 * 1024 * 1024) { // 5MB
                redirectAttributes.addFlashAttribute("error", "Kích thước file không được vượt quá 5MB");
                return "redirect:/profile";
            }
        }
        
        Long id = (Long) session.getAttribute("id");
        User user = userService.getUserById(id);
        
        if (user != null) {
            try {
                // Chỉ cập nhật tên và địa chỉ
                user.setFullName(fullName.trim());
                user.setAddress(address.trim());
                
                // Handle avatar upload if new file is selected
                if (avatarFile != null && !avatarFile.isEmpty()) {
                    String avatar = uploadService.handleSaveUploadFile(avatarFile, "avatar");
                    user.setAvatar(avatar);
                    session.setAttribute("avatar", avatar);
                }
                
                userService.handleSaveUser(user);
                
                // Update session attributes
                session.setAttribute("fullname", fullName.trim());
                
                redirectAttributes.addFlashAttribute("success", "Cập nhật thông tin thành công!");
            } catch (Exception e) {
                redirectAttributes.addFlashAttribute("error", "Có lỗi xảy ra khi cập nhật thông tin: " + e.getMessage());
            }
        } else {
            redirectAttributes.addFlashAttribute("error", "Không tìm thấy thông tin người dùng");
        }
        
        return "redirect:/profile";
    }

    @PostMapping("/profile/location")
    public String updateLocation(@RequestParam("latitude") Double latitude,
        @RequestParam("longitude") Double longitude,
        HttpServletRequest request, 
        RedirectAttributes redirectAttributes) {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("id") == null) {
            return "redirect:/login";
        }
        
        // Validation
        if (latitude == null || longitude == null) {
            redirectAttributes.addFlashAttribute("error", "Tọa độ không hợp lệ");
            return "redirect:/profile";
        }
        
        Long id = (Long) session.getAttribute("id");
        User user = userService.getUserById(id);
        
        if (user != null) {
            try {
                user.setLatitude(latitude);
                user.setLongitude(longitude);
                userService.handleSaveUser(user);
                redirectAttributes.addFlashAttribute("success", "Cập nhật vị trí thành công!");
            } catch (Exception e) {
                redirectAttributes.addFlashAttribute("error", "Có lỗi xảy ra khi cập nhật vị trí: " + e.getMessage());
            }
        } else {
            redirectAttributes.addFlashAttribute("error", "Không tìm thấy thông tin người dùng");
        }
        
        return "redirect:/profile";
    }
}
