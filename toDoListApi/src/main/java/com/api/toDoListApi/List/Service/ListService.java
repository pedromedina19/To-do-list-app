package com.api.toDoListApi.List.Service;

import com.api.toDoListApi.Common.NotFoundException;
import com.api.toDoListApi.List.DTO.CreateListDTO;
import com.api.toDoListApi.List.DTO.UpdateListDTO;
import com.api.toDoListApi.List.Entity.ListEntity;
import com.api.toDoListApi.List.Repository.ListRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListService {
    private final ListRepository listRepository;

    public ListService(ListRepository listRepository) {
        this.listRepository = listRepository;
    }

    @Transactional
    public ListEntity createList(CreateListDTO createListDto) {
        ListEntity newList = new ListEntity();
        newList.setTitle(createListDto.getTitle());
        newList.setlistOrder((int) listRepository.count());
        return listRepository.save(newList);
    }

    @Transactional
    public ListEntity updateList(Long id, UpdateListDTO updateListDto) {
        ListEntity existingList = listRepository.findById(id).orElseThrow(() -> new NotFoundException("Lista não encontrada."));
        existingList.setTitle(updateListDto.getTitle());
        if (updateListDto.getListOrder() != null) {
            existingList.setlistOrder(updateListDto.getListOrder());
        }
        return listRepository.save(existingList);
    }


    public List<ListEntity> getAllLists() {
        return listRepository.findAll();
    }

    public ListEntity getOneList(Long id) {
        return listRepository.findById(id).orElseThrow(() -> new NotFoundException("Lista não encontrada."));
    }

    @Transactional
    public void deleteList(Long id) {
        if (!listRepository.existsById(id)) {
            throw new NotFoundException("Lista não encontrada.");
        }
        listRepository.deleteById(id);
    }
}