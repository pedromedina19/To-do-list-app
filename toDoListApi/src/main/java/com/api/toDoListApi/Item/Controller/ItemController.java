package com.api.toDoListApi.Item.Controller;

import com.api.toDoListApi.Item.DTO.CreateItemDTO;
import com.api.toDoListApi.Item.DTO.UpdateItemDTO;
import com.api.toDoListApi.Item.DTO.UpdateOrderItemDTO;
import com.api.toDoListApi.Item.Entity.ItemEntity;
import com.api.toDoListApi.Item.Service.ItemService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/item")
public class ItemController {
    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }


    @PostMapping
    public ResponseEntity<ItemEntity> createItem(@Valid @RequestBody CreateItemDTO createItemDto) {
        ItemEntity newItem = itemService.createItem(createItemDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(newItem);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ItemEntity> updateItem(@PathVariable Long id, @Valid @RequestBody UpdateItemDTO updateItemDto) {
        ItemEntity updatedItem = itemService.updateItem(id, updateItemDto);
        return ResponseEntity.ok(updatedItem);
    }

    @PatchMapping("/order/{id}")
    public ResponseEntity<ItemEntity> updateItemOrder(@PathVariable Long id, @RequestBody UpdateOrderItemDTO dto) {
        ItemEntity updatedItem = itemService.updateItemOrder(id, dto);
        return ResponseEntity.ok(updatedItem);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemEntity> getOneItem(@PathVariable Long id) {
        ItemEntity item = itemService.getOneItem(id);
        return ResponseEntity.ok(item);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }
}
