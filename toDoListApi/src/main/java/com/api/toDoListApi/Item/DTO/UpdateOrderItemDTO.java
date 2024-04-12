package com.api.toDoListApi.Item.DTO;

public class UpdateOrderItemDTO {
    private Integer currentOrder;
    private Integer targetOrder;
    private Long currentListId;
    private Long targetListId;

    public Integer getCurrentOrder() {
        return currentOrder;
    }

    public void setCurrentOrder(Integer currentOrder) {
        this.currentOrder = currentOrder;
    }

    public Integer getTargetOrder() {
        return targetOrder;
    }

    public void setTargetOrder(Integer targetOrder) {
        this.targetOrder = targetOrder;
    }

    public Long getCurrentListId() {
        return currentListId;
    }

    public void setCurrentListId(Long currentListId) {
        this.currentListId = currentListId;
    }

    public Long getTargetListId() {
        return targetListId;
    }

    public void setTargetListId(Long targetListId) {
        this.targetListId = targetListId;
    }
}
