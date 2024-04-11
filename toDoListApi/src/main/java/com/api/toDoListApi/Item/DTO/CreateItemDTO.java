package com.api.toDoListApi.Item.DTO;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class CreateItemDTO {
    @NotEmpty(message = "O título do item não pode ser vazio.")
    private String titleItem;

    @NotNull(message = "O id da lista não pode ser vazio.")
    private Long listId;

    public String getTitleItem() {
        return titleItem;
    }

    public void setTitleItem(String titleItem) {
        this.titleItem = titleItem;
    }

    public Long getListId() {
        return listId;
    }

    public void setListId(Long listId) {
        this.listId = listId;
    }
}
