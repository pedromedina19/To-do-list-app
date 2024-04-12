import { CreateItemDto, Item, UpdateItemDto, UpdateOrderItemDto } from '../interfaces/Iitem';
import { http } from './http';

export const createItem = async (
  dto: CreateItemDto,
) => {
  return http.post<Item>('/item', {
    ...dto,
  });
};

export const updateItem = async (
  id: number,
  dto: UpdateItemDto,
) => {
  return http.patch<Item>(`/item/${id}`, {
    ...dto,
  });
};

export const updateOrderItem = async (
  id: number,
  dto: UpdateOrderItemDto,
) => {
  return http.patch<Item>(`/item/order/${id}`, {
    ...dto,
  });
};

export const deleteItem = async (
  id: number,
) => {
  return http.delete<Item>(`/item/${id}`);
};