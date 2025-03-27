package backend.controller;

import backend.model.InventoryModel;
//import backend.model.UserModel;
import backend.repository.InventoryRepository;
import backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/admin/dashboard")
public class StatsController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    @GetMapping("/stats")
    public Map<String, Object> getDashboardStats() {
        // 1️⃣ Fetch total number of users (count rows in the user table)
        long totalUsers = userRepository.count(); // Counts all users

        // 2️⃣ Fetch all inventory items
        List<InventoryModel> inventoryList = inventoryRepository.findAll();

        // 3️⃣ Calculate total revenue (sum of item price * quantity)
        double totalRevenue = inventoryList.stream()
                .mapToDouble(item -> {
                    // Parsing price and quantity from String to double (you can replace with actual types in the model)
                    double price = Double.parseDouble(item.getItemPrice().replaceAll(",", ""));
                    int quantity = Integer.parseInt(item.getItemQty());
                    return price * quantity;
                })
                .sum();

        // 4️⃣ Get category-wise product count and total price
        List<Map<String, Object>> categoryStats = inventoryList.stream()
                .collect(Collectors.groupingBy(
                        InventoryModel::getItemCategory  // Group by category
                ))
                .entrySet().stream()
                .map(entry -> {
                    Map<String, Object> stats = new HashMap<>();
                    List<InventoryModel> items = entry.getValue();
                    stats.put("category", entry.getKey());
                    stats.put("totalProducts", items.size());
                    stats.put("totalPrice", items.stream()
                            .mapToDouble(item -> {
                                double price = Double.parseDouble(item.getItemPrice().replaceAll(",", ""));
                                int quantity = Integer.parseInt(item.getItemQty());
                                return price * quantity;
                            })
                            .sum());
                    return stats;
                })
                .collect(Collectors.toList());

        // 5️⃣ Create the response map
        Map<String, Object> response = new HashMap<>();
        response.put("totalUsers", totalUsers);  // Display total users instead of admins
        response.put("totalRevenue", totalRevenue);
        response.put("categoryStats", categoryStats);

        return response;
    }
}
