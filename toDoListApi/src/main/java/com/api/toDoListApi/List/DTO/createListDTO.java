package com.api.toDoListApi.List.DTO;


import jakarta.validation.constraints.NotEmpty;

public class createListDTO {
    @NotEmpty(message = "O título da lista não pode ser vazio.")
    private String title;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
