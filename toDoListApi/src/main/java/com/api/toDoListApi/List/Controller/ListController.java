package com.api.toDoListApi.List.Controller;

import com.api.toDoListApi.List.DTO.CreateListDTO;
import com.api.toDoListApi.List.DTO.UpdateListDTO;
import com.api.toDoListApi.List.DTO.UpdateOrderListDTO;
import com.api.toDoListApi.List.Entity.ListEntity;
import com.api.toDoListApi.List.Service.ListService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import java.util.List;


@RestController
@RequestMapping("/list")
public class ListController {
    private final ListService listService;

    public ListController(ListService listService) {
        this.listService = listService;
    }
    @Operation(summary = "Cria uma nova lista", description = "Cria uma nova lista", responses = {
            @ApiResponse(responseCode = "201", description = "Lista criada com sucesso", content = @Content(schema = @Schema(implementation = ListEntity.class))),
            @ApiResponse(responseCode = "400", description = "Requisição inválida")
    })
    @PostMapping
    public ResponseEntity<ListEntity> createList(@Valid @RequestBody(description = "DTO para criar uma nova lista", required = true, content = @Content(schema = @Schema(implementation = CreateListDTO.class))) CreateListDTO createListDto) {
        ListEntity newList = listService.createList(createListDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(newList);
    }
    @Operation(summary = "Atualiza uma lista existente", description = "Atualiza uma lista existente", responses = {
            @ApiResponse(responseCode = "200", description = "Lista atualizada com sucesso", content = @Content(schema = @Schema(implementation = ListEntity.class))),
            @ApiResponse(responseCode = "400", description = "Requisição inválida"),
            @ApiResponse(responseCode = "404", description = "Lista não encontrada")
    })
    @PatchMapping("/{id}")
    public ResponseEntity<ListEntity> updateList(@PathVariable Long id, @Valid @RequestBody(description = "DTO para atualizar uma lista", required = true, content = @Content(schema = @Schema(implementation = UpdateListDTO.class))) UpdateListDTO updateListDto) {
        ListEntity updatedList = listService.updateList(id, updateListDto);
        return ResponseEntity.ok(updatedList);
    }
    @Operation(summary = "Atualiza a ordem de uma lista existente", description = "Atualiza a ordem de uma lista existente", responses = {
            @ApiResponse(responseCode = "200", description = "Ordem da lista atualizada com sucesso", content = @Content(schema = @Schema(implementation = ListEntity.class))),
            @ApiResponse(responseCode = "400", description = "Requisição inválida"),
            @ApiResponse(responseCode = "404", description = "Lista não encontrada")
    })
    @PatchMapping("/order/{id}")
    public ResponseEntity<ListEntity> updateListOrder(@PathVariable Long id, @RequestBody(description = "DTO para atualizar a ordem de uma lista", required = true, content = @Content(schema = @Schema(implementation = UpdateOrderListDTO.class))) UpdateOrderListDTO dto) {
        ListEntity updatedList = listService.updateListOrder(id, dto);
        return ResponseEntity.ok(updatedList);
    }
    @Operation(summary = "Obtém todas as listas", description = "Obtém todas as listas", responses = {
            @ApiResponse(responseCode = "200", description = "Listas obtidas com sucesso", content = @Content(schema = @Schema(implementation = ListEntity.class)))
    })
    @GetMapping
    public ResponseEntity<List<ListEntity>> getAllLists() {
        List<ListEntity> lists = listService.getAllLists();
        return ResponseEntity.ok(lists);
    }
    @Operation(summary = "Obtém uma lista", description = "Obtém uma lista pelo ID", responses = {
            @ApiResponse(responseCode = "200", description = "Lista obtida com sucesso", content = @Content(schema = @Schema(implementation = ListEntity.class))),
            @ApiResponse(responseCode = "404", description = "Lista não encontrada")
    })
    @GetMapping("/{id}")
    public ResponseEntity<ListEntity> getOneList(@PathVariable Long id) {
        ListEntity list = listService.getOneList(id);
        return ResponseEntity.ok(list);
    }
    @Operation(summary = "Deleta uma lista", description = "Deleta uma lista pelo ID", responses = {
            @ApiResponse(responseCode = "204", description = "Lista deletada com sucesso"),
            @ApiResponse(responseCode = "404", description = "Lista não encontrada")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteList(@PathVariable Long id) {
        listService.deleteList(id);
        return ResponseEntity.noContent().build();
    }
}
