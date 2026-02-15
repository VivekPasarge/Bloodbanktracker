// src/main/java/com/yourorg/bloodbank/config/WebConfig.java
package com.yourorg.bloodbank.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

@Configuration
public class WebConfig {

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();

    // Allow the dev server origins you use (add more if needed)
    // setAllowedOriginPatterns allows wildcard/ports — safer for dev.
    config.setAllowedOriginPatterns(List.of("http://localhost:5173", "http://localhost:5174"));
    config.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS","PATCH"));
    config.setAllowedHeaders(List.of("*"));
    config.setAllowCredentials(true); // required if frontend sends cookies or Authorization header
    config.setMaxAge(3600L);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
  }
}
