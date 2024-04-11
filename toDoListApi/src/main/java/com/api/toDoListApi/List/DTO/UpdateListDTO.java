package com.api.toDoListApi.List.DTO;

public class UpdateListDTO {
    private String title;
    private Integer listOrder;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
    public Integer getListOrder() {
        return listOrder;
    }

    public void setListOrder(Integer listOrder) {
        this.listOrder = listOrder;
    }
}
