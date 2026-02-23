package com.yourorg.bloodbank.config;

import com.yourorg.bloodbank.security.JwtFilter;
import com.yourorg.bloodbank.security.JwtUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableMethodSecurity   // required for @PreAuthorize
public class SecurityConfig {

    private final JwtUtils jwtUtils;
    private final CorsConfigurationSource corsConfigurationSource;

    public SecurityConfig(
            JwtUtils jwtUtils,
            CorsConfigurationSource corsConfigurationSource
    ) {
        this.jwtUtils = jwtUtils;
        this.corsConfigurationSource = corsConfigurationSource;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        JwtFilter jwtFilter = new JwtFilter(jwtUtils);

        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource))
            .csrf(csrf -> csrf.disable())

            .authorizeHttpRequests(auth -> auth

                // ============ PUBLIC ============
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers("/api/auth/**").permitAll()

                // ============ ML SERVICE ============
                .requestMatchers("/api/ml/**").permitAll()

                // ============ HOSPITALS ============
                // 🔓 PUBLIC (important)
                .requestMatchers(HttpMethod.GET,
                        "/api/hospitals",
                        "/api/hospitals/**"
                ).permitAll()

                // 🔒 ADMIN ONLY
                .requestMatchers(HttpMethod.POST, "/api/hospitals/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/hospitals/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/hospitals/**").hasRole("ADMIN")

                // ============ INVENTORY ============
                .requestMatchers(HttpMethod.GET, "/api/inventory/**").authenticated()
                .requestMatchers("/api/inventory/**").hasRole("ADMIN")

                // ============ DONORS ============
                .requestMatchers(HttpMethod.GET, "/api/donors/**").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/donors/**").authenticated()
                .requestMatchers(HttpMethod.PUT, "/api/donors/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/donors/**").hasRole("ADMIN")

                // ============ REQUESTS ============
                .requestMatchers(HttpMethod.GET, "/api/requests/**").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/requests/**").authenticated()
                .requestMatchers(HttpMethod.PUT, "/api/requests/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/requests/**").hasRole("ADMIN")

                // ============ DELIVERIES ============
                .requestMatchers(HttpMethod.GET, "/api/deliveries/**").authenticated()
                .requestMatchers("/api/deliveries/**").hasRole("ADMIN")

                // ============ USERS ============
                .requestMatchers("/api/users/**").hasRole("ADMIN")

                // ============ DEFAULT ============
                .anyRequest().authenticated()
            )

            // 🔑 JWT FILTER
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}