package backend.controller;

import backend.exception.InvalidCodeException;
import backend.exception.UserNotFoundException;
import backend.model.UserModel;
import backend.repository.UserRepository;
import backend.exception.UserAlreadyExistsException;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@CrossOrigin("http://localhost:5173")
@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;  // Autowire the password encoder

    @PostMapping("/user")
    public UserModel newUserModel(@RequestBody UserModel newUserModel) {
        // Check if user already exists
        if (userRepository.findByEmail(newUserModel.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("User with this email already exists");
        }

        // Encrypt password before saving
        newUserModel.setPassword(passwordEncoder.encode(newUserModel.getPassword()));

        return userRepository.save(newUserModel);
    }

    // Login User & Store ID in Session
    @PostMapping("/login")
    public String loginUser(@RequestBody UserModel loginRequest, HttpSession session) {
        Optional<UserModel> user = userRepository.findByEmail(loginRequest.getEmail());

        if (user.isEmpty() || !passwordEncoder.matches(loginRequest.getPassword(), user.get().getPassword())) {
            throw new UserNotFoundException("Invalid email or password");
        }

        // Store user ID in session
        session.setAttribute("userId", user.get().getId());

        return "Login successful!";
    }

    // Logout User
    @PostMapping("/logout")
    public String logoutUser(HttpSession session) {
        session.invalidate();
        return "Logout successful!";
    }




}
