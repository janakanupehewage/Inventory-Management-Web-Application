package backend.exception;

public class InventoryNotFoundException extends RuntimeException {
    public InventoryNotFoundException(Long id){
        super("Could not find ID" + id);
    }

    public  InventoryNotFoundException(String message){
        super(message);
    }
}
