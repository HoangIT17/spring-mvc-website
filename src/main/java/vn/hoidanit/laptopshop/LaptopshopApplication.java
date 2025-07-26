package vn.hoidanit.laptopshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.ApplicationContext;

// @SpringBootApplication
// include: bao gom >< exclude: loai bo ra
@SpringBootApplication(
	exclude = org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class)
public class LaptopshopApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		ApplicationContext hoangit = SpringApplication.run(LaptopshopApplication.class, args);
		for(String s: hoangit.getBeanDefinitionNames())
		{
			System.out.println(s);
		}

	}

}
