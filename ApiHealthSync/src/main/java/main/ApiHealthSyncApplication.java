package main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication
public class 	ApiHealthSyncApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiHealthSyncApplication.class, args);
	}

}
