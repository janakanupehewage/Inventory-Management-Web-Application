package backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // New way to disable CSRF
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/user", "/login","/generate-security-code", "/verify-security-code","/api/admin/dashboard/stats","/inventory/itemImg","/inventory","/uploads/{filename}","/inventory/{modelNo}").permitAll() // Allow unauthenticated access to the /user endpoint
                        .anyRequest().authenticated() // Require authentication for all other requests
                );
        return http.build();
    }
}