package backend.repository;

import backend.model.InventoryModel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface InventoryRepository extends JpaRepository<InventoryModel, Long> {
    Optional<InventoryModel> findByModelNo(String modelNo);
    //Optional<InventoryModel> deleteByItemId(String item_id);
    void deleteByModelNo(String modelNo);// Change to String if the column is of type String
}

