package com.api.toDoListApi.List.Controller;

import com.api.toDoListApi.List.DTO.CreateListDTO;
import com.api.toDoListApi.List.DTO.UpdateListDTO;
import com.api.toDoListApi.List.Entity.ListEntity;
import com.api.toDoListApi.List.Service.ListService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/list")
public class ListController {
    private final ListService listService;

    public ListController(ListService listService) {
        this.listService = listService;
    }

    @PostMapping
    public ResponseEntity<ListEntity> createList(@Valid @RequestBody CreateListDTO createListDto) {
        ListEntity newList = listService.createList(createListDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(newList);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ListEntity> updateList(@PathVariable Long id, @Valid @RequestBody UpdateListDTO updateListDto) {
        ListEntity updatedList = listService.updateList(id, updateListDto);
        return ResponseEntity.ok(updatedList);
    }
    @PutMapping("/order/{id}")
    public ResponseEntity<ListEntity> updateListOrder(@PathVariable Long id, @RequestBody Map<String, Integer> json) {
        ListEntity updatedList = listService.updateListOrder(id, json.get("listOrder"));
        return ResponseEntity.ok(updatedList);
    }



    @GetMapping
    public ResponseEntity<List<ListEntity>> getAllLists() {
        List<ListEntity> lists = listService.getAllLists();
        return ResponseEntity.ok(lists);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ListEntity> getOneList(@PathVariable Long id) {
        ListEntity list = listService.getOneList(id);
        return ResponseEntity.ok(list);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteList(@PathVariable Long id) {
        listService.deleteList(id);
        return ResponseEntity.noContent().build();
    }
}
