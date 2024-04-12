package com.api.toDoListApi.List.DTO;


import jakarta.validation.constraints.NotEmpty;

public class CreateListDTO {
    @NotEmpty(message = "O título da lista não pode ser vazio.")
    private String titleList;

    public String getTitleList() {
        return titleList;
    }

    public void setTitleList(String titleList) {
        this.titleList = titleList;
    }
}
