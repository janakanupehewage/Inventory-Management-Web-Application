package backend.repository;

import backend.model.SecurityCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SecurityCodeRepository extends JpaRepository<SecurityCode, Long> {

    // Query to find the most recent security code (based on the ID, assuming it's auto-incremented)
    @Query("SELECT s.securityCode FROM SecurityCode s ORDER BY s.id DESC")
    String findLatestCode();
}
