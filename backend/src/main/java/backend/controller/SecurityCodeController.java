package backend.controller;

import backend.exception.InvalidCodeException;
import backend.model.SecurityCode;
import backend.model.SecurityCodeRequest;
import backend.repository.SecurityCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

//import java.util.Optional;
import java.util.Random;

@RestController
public class SecurityCodeController {

    @Autowired
    private SecurityCodeRepository securityCodeRepository;

    // Generate a security code and store it in the database (already existing)
    @PostMapping("/generate-security-code")
    public String generateSecurityCode() {
        String securityCode = String.valueOf(new Random().nextInt(1000000)); // Generate a 6-digit code

        // Save the security code to the database
        SecurityCode newSecurityCode = new SecurityCode(securityCode);
        securityCodeRepository.save(newSecurityCode);

        return "Security code generated and saved!";
    }

    // Endpoint to verify the security code entered by the user
    @PostMapping("/verify-security-code")
    public @ResponseBody String verifySecurityCode(@RequestBody SecurityCodeRequest request) {
        String storedSecurityCode = securityCodeRepository.findLatestCode();

        if (storedSecurityCode.equals(request.getSecurityCode())) {
            return "Security code is correct!";
        } else {
            throw new InvalidCodeException("Invalid security code");
        }
    }


}
