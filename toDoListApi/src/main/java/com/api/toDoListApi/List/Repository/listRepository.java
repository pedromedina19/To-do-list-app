package com.api.toDoListApi.List.Repository;

import com.api.toDoListApi.List.Entity.listEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface listRepository extends JpaRepository<listEntity, Long> {
}
