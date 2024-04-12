import { http } from './http';
import { List, UpdateOrderListDto } from '../interfaces/Ilist';

export const getAllList = async () => {
  return http.get<List[]>('/list')
    .then((response): List[] => {
      return response.data;
    });
};

export const createList = async (
  titleList: string,
) => {
  return http.post<List>('/list', {
    titleList: titleList,
  });
};

export const updateList = async (
  id: number,
  titleList: string,
) => {
  return http.patch<List>(`/list/${id}`, {
    titleList: titleList,
  });
};

export const updateOrderList = async (
  id: number,
  dto: UpdateOrderListDto,
) => {
  return http.patch<List>(`/list/order/${id}`, {
    ...dto,
  });
};

export const deleteList = async (
  id: number,
) => {
  return http.delete<List>(`/list/${id}`);
};

