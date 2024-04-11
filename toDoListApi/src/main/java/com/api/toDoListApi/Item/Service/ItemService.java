package com.api.toDoListApi.Item.Service;

import com.api.toDoListApi.Common.NotFoundException;
import com.api.toDoListApi.Item.DTO.CreateItemDTO;
import com.api.toDoListApi.Item.DTO.UpdateItemDTO;
import com.api.toDoListApi.Item.Entity.ItemEntity;
import com.api.toDoListApi.Item.Repository.ItemRepository;
import com.api.toDoListApi.List.Entity.ListEntity;
import com.api.toDoListApi.List.Repository.ListRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class ItemService {
    private final ItemRepository itemRepository;
    private final ListRepository listRepository;

    public ItemService(ItemRepository itemRepository, ListRepository listRepository) {
        this.itemRepository = itemRepository;
        this.listRepository = listRepository;
    }

    @Transactional
    public ItemEntity createItem(CreateItemDTO createItemDto) {
        ItemEntity newItem = new ItemEntity();
        newItem.setTitle(createItemDto.getTitleItem());

        // Obtenha a instância da lista correspondente ao ID
        ListEntity list = listRepository.findById(createItemDto.getListId())
                .orElseThrow(() -> new NotFoundException("Lista não encontrada."));

        // Defina o campo list com a instância da lista
        newItem.setList(list);

        // Defina o campo itemOrder com base no número atual de itens na lista
        int itemCount = itemRepository.countByListId(createItemDto.getListId());
        newItem.setitemOrder(itemCount);

        return itemRepository.save(newItem);
    }



    @Transactional
    public ItemEntity updateItem(Long id, UpdateItemDTO updateItemDto) {
        ItemEntity existingItem = itemRepository.findById(id).orElseThrow(() -> new NotFoundException("Item não encontrado."));
        existingItem.setTitle(updateItemDto.getTitleItem());
        existingItem.setDescription(updateItemDto.getDescription());
        existingItem.setStartDate(updateItemDto.getStartDate());
        existingItem.setFinalDate(updateItemDto.getFinalDate());
        if (updateItemDto.getItemOrder() != null) {
            existingItem.setitemOrder(updateItemDto.getItemOrder());
        }
        return itemRepository.save(existingItem);
    }


    public ItemEntity getOneItem(Long id) {
        return itemRepository.findById(id).orElseThrow(() -> new NotFoundException("Item não encontrado."));
    }

    @Transactional
    public void deleteItem(Long id) {
        if (!itemRepository.existsById(id)) {
            throw new NotFoundException("Item não encontrado.");
        }
        itemRepository.deleteById(id);
    }
}
