package com.api.toDoListApi.Item.Repository;

import com.api.toDoListApi.Item.Entity.itemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface itemRepository extends JpaRepository<itemEntity, Long> {
    @Query("SELECT COUNT(i) FROM itemEntity i WHERE i.list.id = :listId")
    int countByListId(@Param("listId") Long listId);

    @Query("SELECT i FROM itemEntity i WHERE i.list.id = :listId ORDER BY i.itemOrder ASC")
    List<itemEntity> findByListIdOrderByOrderAsc(@Param("listId") Long listId);
}