package com.api.toDoListApi.List.Repository;

import com.api.toDoListApi.List.Entity.ListEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ListRepository extends JpaRepository<ListEntity, Long> {
    List<ListEntity> findByListOrder(Integer listOrder);
}

