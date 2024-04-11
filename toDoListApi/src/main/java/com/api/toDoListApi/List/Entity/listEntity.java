package com.api.toDoListApi.List.Entity;


import com.api.toDoListApi.Item.Entity.itemEntity;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "lists")
public class listEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "listOrder")
    private Integer listOrder;

    @OneToMany(mappedBy = "list", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<itemEntity> items;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getlistOrder() {
        return listOrder;
    }

    public void setlistOrder(Integer listOrder) {
        this.listOrder = listOrder;
    }

    public List<itemEntity> getItems() {
        return items;
    }

    public void setItems(List<itemEntity> items) {
        this.items = items;
    }
}