package backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class SecurityCode {

    @Id
    @GeneratedValue
    private Long id;

    private String securityCode;

    public SecurityCode() {
    }

    public SecurityCode(String securityCode) {
        this.securityCode = securityCode;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSecurityCode() {
        return securityCode;
    }

    public void setSecurityCode(String securityCode) {
        this.securityCode = securityCode;
    }
}
