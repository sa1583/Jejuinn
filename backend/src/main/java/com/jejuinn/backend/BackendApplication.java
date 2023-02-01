package com.jejuinn.backend;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.nio.file.Paths;

@SpringBootApplication
@Slf4j
public class BackendApplication {

	public static void main(String[] args) {
		System.out.println(Paths.get(System.getProperty("user.home"), ".kurento","config.properties"));
		SpringApplication.run(BackendApplication.class, args);
	}

}
