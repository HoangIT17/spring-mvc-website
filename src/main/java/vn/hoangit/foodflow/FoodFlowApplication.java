package vn.hoangit.foodflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication(exclude = org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class)

@SpringBootApplication
//include >< exclude
public class FoodFlowApplication {

	public static void main(String[] args) {

		SpringApplication.run(FoodFlowApplication.class, args);

	}

}
