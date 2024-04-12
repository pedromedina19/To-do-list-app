package com.api.toDoListApi.List.Service;

import com.api.toDoListApi.Common.NotFoundException;
import com.api.toDoListApi.List.DTO.CreateListDTO;
import com.api.toDoListApi.List.DTO.UpdateListDTO;
import com.api.toDoListApi.List.DTO.UpdateOrderListDTO;
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
        newList.setTitleList(createListDto.getTitleList());
        newList.setlistOrder((int) listRepository.count());
        return listRepository.save(newList);
    }

    @Transactional
    public ListEntity updateList(Long id, UpdateListDTO updateListDto) {
        ListEntity existingList = listRepository.findById(id).orElseThrow(() -> new NotFoundException("Lista não encontrada."));
        existingList.setTitleList(updateListDto.getTitleList());
        return listRepository.save(existingList);
    }

    @Transactional
    public ListEntity updateListOrder(Long id, UpdateOrderListDTO dto) {
        // Validação da entrada do usuário
        if (dto.getCurrentOrder() < 0 || dto.getTargetOrder() < 0) {
            throw new IllegalArgumentException("A ordem da lista não pode ser negativa.");
        }

        // Busca a lista existente pelo ID
        ListEntity existingList = listRepository.findById(id).orElseThrow(() -> new NotFoundException("Lista não encontrada."));

        // Atualiza a ordem das outras listas
        List<ListEntity> allLists = listRepository.findAll();
        for (ListEntity list : allLists) {
            if (list.getlistOrder() > dto.getCurrentOrder() && list.getlistOrder() <= dto.getTargetOrder()) {
                list.setlistOrder(list.getlistOrder() - 1);
            } else if (list.getlistOrder() < dto.getCurrentOrder() && list.getlistOrder() >= dto.getTargetOrder()) {
                list.setlistOrder(list.getlistOrder() + 1);
            }
            listRepository.save(list);
        }

        // Atualiza a ordem da lista
        existingList.setlistOrder(dto.getTargetOrder());

        // Salva a lista atualizada no repositório
        ListEntity updatedList = listRepository.save(existingList);

        return updatedList;
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