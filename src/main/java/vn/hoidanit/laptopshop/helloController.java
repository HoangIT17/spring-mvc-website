package vn.hoidanit.laptopshop;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class helloController {

		@GetMapping("/")
			public String index() {
				return "Hello World";
			}
		
		@GetMapping("/user")
		public String userPage() {
			return "Only users can see this page";
		}
		
		@GetMapping("/admin")
		public String userAdmin() {
			return "Only admins can see this page";
		}

}
