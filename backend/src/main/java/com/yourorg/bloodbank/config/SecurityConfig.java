// src/main/java/com/yourorg/bloodbank/config/SecurityConfig.java
package com.yourorg.bloodbank.config;

import com.yourorg.bloodbank.security.JwtFilter;
import com.yourorg.bloodbank.security.JwtUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
public class SecurityConfig {

    private final JwtUtils jwtUtils;
    private final CorsConfigurationSource corsConfigurationSource;

    public SecurityConfig(JwtUtils jwtUtils, CorsConfigurationSource corsConfigurationSource){
        this.jwtUtils = jwtUtils;
        this.corsConfigurationSource = corsConfigurationSource;
    }

    @Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    JwtFilter jwtFilter = new JwtFilter(jwtUtils);

    http
        .cors().configurationSource(corsConfigurationSource)
        .and()
        .csrf().disable()
        .authorizeHttpRequests(auth -> auth

            // preflight
            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

            // auth
            .requestMatchers("/api/auth/**").permitAll()

            // hospitals
            .requestMatchers(HttpMethod.GET, "/api/hospitals/**").permitAll()
            .requestMatchers(HttpMethod.POST, "/api/hospitals/**").hasRole("ADMIN")

            // inventory
            .requestMatchers(HttpMethod.GET, "/api/inventory/**").authenticated()
            .requestMatchers("/api/inventory/**").hasRole("ADMIN")

            // donors
            .requestMatchers(HttpMethod.GET, "/api/donors/**").authenticated()
            .requestMatchers(HttpMethod.POST, "/api/donors/**").authenticated()

            // requests
            .requestMatchers(HttpMethod.POST, "/api/requests/**").authenticated()
            .requestMatchers(HttpMethod.GET, "/api/requests/**").authenticated()
            .requestMatchers(HttpMethod.PUT, "/api/requests/**").hasRole("ADMIN")

            // deliveries
            .requestMatchers(HttpMethod.GET, "/api/deliveries/**").authenticated()
            .requestMatchers(HttpMethod.PUT, "/api/deliveries/**").hasRole("ADMIN")

            // users (admin only)
            .requestMatchers("/api/users/**").hasRole("ADMIN")

            .anyRequest().authenticated()
        )
        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
}

}
