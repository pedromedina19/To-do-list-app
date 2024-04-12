package com.api.toDoListApi.Item.Controller;

import com.api.toDoListApi.Item.DTO.CreateItemDTO;
import com.api.toDoListApi.Item.DTO.UpdateItemDTO;
import com.api.toDoListApi.Item.DTO.UpdateOrderItemDTO;
import com.api.toDoListApi.Item.Entity.ItemEntity;
import com.api.toDoListApi.Item.Service.ItemService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/item")
public class ItemController {
    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @Operation(summary = "Cria um novo item", description = "Cria um novo item na lista", responses = {
            @ApiResponse(responseCode = "201", description = "Item criado com sucesso", content = @Content(schema = @Schema(implementation = ItemEntity.class))),
            @ApiResponse(responseCode = "400", description = "Requisição inválida")
    })
    @PostMapping
    public ResponseEntity<ItemEntity> createItem(@Valid @RequestBody(description = "DTO para criar um novo item", required = true, content = @Content(schema = @Schema(implementation = CreateItemDTO.class))) CreateItemDTO createItemDto) {
        ItemEntity newItem = itemService.createItem(createItemDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(newItem);
    }
    @Operation(summary = "Atualiza um item existente", description = "Atualiza um item existente na lista", responses = {
            @ApiResponse(responseCode = "200", description = "Item atualizado com sucesso", content = @Content(schema = @Schema(implementation = ItemEntity.class))),
            @ApiResponse(responseCode = "400", description = "Requisição inválida"),
            @ApiResponse(responseCode = "404", description = "Item não encontrado")
    })
    @PatchMapping("/{id}")
    public ResponseEntity<ItemEntity> updateItem(@PathVariable Long id, @Valid @RequestBody(description = "DTO para atualizar um item", required = true, content = @Content(schema = @Schema(implementation = UpdateItemDTO.class))) UpdateItemDTO updateItemDto) {
        ItemEntity updatedItem = itemService.updateItem(id, updateItemDto);
        return ResponseEntity.ok(updatedItem);
    }
    @Operation(summary = "Atualiza a ordem de um item existente", description = "Atualiza a ordem de um item existente na lista", responses = {
            @ApiResponse(responseCode = "200", description = "Ordem do item atualizada com sucesso", content = @Content(schema = @Schema(implementation = ItemEntity.class))),
            @ApiResponse(responseCode = "400", description = "Requisição inválida"),
            @ApiResponse(responseCode = "404", description = "Item não encontrado")
    })
    @PatchMapping("/order/{id}")
    public ResponseEntity<ItemEntity> updateItemOrder(@PathVariable Long id, @RequestBody(description = "DTO para atualizar a ordem de um item", required = true, content = @Content(schema = @Schema(implementation = UpdateOrderItemDTO.class))) UpdateOrderItemDTO dto) {
        ItemEntity updatedItem = itemService.updateItemOrder(id, dto);
        return ResponseEntity.ok(updatedItem);
    }
    @Operation(summary = "Obtém um item", description = "Obtém um item da lista pelo ID", responses = {
            @ApiResponse(responseCode = "200", description = "Item obtido com sucesso", content = @Content(schema = @Schema(implementation = ItemEntity.class))),
            @ApiResponse(responseCode = "404", description = "Item não encontrado")
    })
    @GetMapping("/{id}")
    public ResponseEntity<ItemEntity> getOneItem(@PathVariable Long id) {
        ItemEntity item = itemService.getOneItem(id);
        return ResponseEntity.ok(item);
    }
    @Operation(summary = "Deleta um item", description = "Deleta um item da lista pelo ID", responses = {
            @ApiResponse(responseCode = "204", description = "Item deletado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Item não encontrado")
    })

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }
}
