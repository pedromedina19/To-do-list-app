package com.api.toDoListApi.Item.Entity;


import com.api.toDoListApi.List.Entity.listEntity;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "items")
public class itemEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "final_date")
    private Date finalDate;

    @Column(name = "itemOrder")
    private Integer itemOrder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "list_id")
    private listEntity list;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getFinalDate() {
        return finalDate;
    }

    public void setFinalDate(Date finalDate) {
        this.finalDate = finalDate;
    }

    public Integer getitemOrder() {
        return itemOrder;
    }

    public void setitemOrder(Integer itemOrder) {
        this.itemOrder = itemOrder;
    }

    public listEntity getList() {
        return list;
    }

    public void setList(listEntity list) {
        this.list = list;
    }
}