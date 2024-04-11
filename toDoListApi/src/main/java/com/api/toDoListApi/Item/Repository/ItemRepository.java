package com.api.toDoListApi.Item.Repository;

import com.api.toDoListApi.Item.Entity.ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ItemRepository extends JpaRepository<ItemEntity, Long> {
    @Query("SELECT COUNT(i) FROM ItemEntity i WHERE i.list.id = :listId")
    int countByListId(@Param("listId") Long listId);

    @Query("SELECT i FROM ItemEntity i WHERE i.list.id = :listId ORDER BY i.itemOrder ASC")
    List<ItemEntity> findByListIdOrderByOrderAsc(@Param("listId") Long listId);

    List<ItemEntity> findByItemOrder(Integer itemOrder);
}