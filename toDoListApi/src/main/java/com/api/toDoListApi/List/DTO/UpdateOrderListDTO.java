package com.api.toDoListApi.List.DTO;

public class UpdateOrderListDTO {
    private Integer currentOrder;
    private Integer targetOrder;
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

}
