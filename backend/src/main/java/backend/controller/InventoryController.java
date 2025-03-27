package backend.controller;

import backend.exception.InventoryNotFoundException;
import backend.model.InventoryModel;
import backend.repository.InventoryRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
//import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

//@CrossOrigin("https://inventory-management-we-git-62d7b6-madhushans-projects-a8699fbf.vercel.app")
@RestController
public class InventoryController {
    @Autowired
    private InventoryRepository inventoryRepository;

    //Insert
    @PostMapping("/inventory")
    public InventoryModel newInventoryModel(@RequestBody InventoryModel newInventoryModel){
        return inventoryRepository.save(newInventoryModel);
    }

    @PostMapping("/inventory/itemImg")
    public String itemImage(@RequestParam("file")MultipartFile file){
        String folder = "src/main/uploads/";
        String itemImage = file.getOriginalFilename();

        try{
            File uploadDir = new File(folder);
            if(!uploadDir.exists()){
                uploadDir.mkdir();
            }
            file.transferTo(Paths.get(folder+itemImage));
        }catch (IOException e){
            e.printStackTrace();
            return "Error uploading file; " + itemImage;
        }
        return itemImage;
    }

    //Read
    @GetMapping("/inventory")
    List<InventoryModel> getAllItems() { return inventoryRepository.findAll();}

    @GetMapping("/inventory/{modelNo}")
    InventoryModel getModelNo(@PathVariable String modelNo){
        System.out.println("Received item_id: " + modelNo);
        return inventoryRepository.findByModelNo(modelNo).orElseThrow( ()-> new InventoryNotFoundException(modelNo));
    }

    private final String UPLOAD_DIR = "src/main/uploads/";

    @GetMapping("/uploads/{filename}")
    public ResponseEntity<FileSystemResource> getImage(@PathVariable String filename){
        File file = new File(UPLOAD_DIR + filename);
        if(!file.exists()){
            return ResponseEntity.notFound().build();

        }
        return ResponseEntity.ok(new FileSystemResource(file));
    }

    @PutMapping("/inventory/{modelNo}")
    public InventoryModel updateItem(
            @RequestPart(value = "itemDetails") String itemDetails,
            @RequestPart(value = "file", required = false) MultipartFile file,
            @PathVariable String modelNo
    ){
        System.out.println("Item Details: "+itemDetails);
        if(file != null){
            System.out.println("File received: "+file.getOriginalFilename());
        } else{
            System.out.println("No file uploaded");
        }
        ObjectMapper mapper = new ObjectMapper();
        InventoryModel newInventory;

        try{
            newInventory = mapper.readValue(itemDetails, InventoryModel.class);
        } catch (Exception e){
            throw new RuntimeException("Error parsing itemDetails", e);
        }

        return inventoryRepository.findByModelNo(modelNo).map(existingInventory -> {
            //existingInventory.setItemId(newInventory.getItemId());
            existingInventory.setItemName(newInventory.getItemName());
            existingInventory.setItemCategory(newInventory.getItemCategory());
            existingInventory.setBrand(newInventory.getBrand());
            existingInventory.setModelNo(newInventory.getModelNo());
            existingInventory.setItemQty(newInventory.getItemQty());
            existingInventory.setItemPrice(newInventory.getItemPrice());
            existingInventory.setItemDetails(newInventory.getItemDetails());

            if (file != null && !file.isEmpty()) {
                String folder = "src/main/uploads/";
                String itemImage = file.getOriginalFilename();

                try {
                    file.transferTo(Paths.get(folder + itemImage));
                } catch (IOException e) {
                    throw new RuntimeException("Error Saving Uploaded File", e);
                }
            }

            return inventoryRepository.save(existingInventory);

        }).orElseThrow(()-> new InventoryNotFoundException(modelNo));
    }

    //Delete data from database

    @Transactional
    @DeleteMapping("/inventory/{modelNo}")
    String deleteItem(@PathVariable String modelNo){
        //check item is existing database
        InventoryModel inventoryItem = inventoryRepository.findByModelNo(modelNo).
                orElseThrow(()-> new InventoryNotFoundException(modelNo));

        //image delete section
        String itemImage = inventoryItem.getItemImage();
        if(itemImage != null && !itemImage.isEmpty()){
            File imageFile = new File("src/main/uploads" + itemImage);
            if (imageFile.exists()){
                if(imageFile.delete()){
                    System.out.println("Image deleted successfully");
                } else{
                    System.out.println("Failed image delete");
                }
            }
        }
        //delete item from the repository
        inventoryRepository.deleteByModelNo(modelNo);

        return "data with id" + modelNo + "and image deleted";
    }

}
