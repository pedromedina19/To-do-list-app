import { Item } from './Iitem';

export interface List {
  id: number;
  titleList: string;
  listOrder: number;
  items?: Item[] | null;
}

export interface UpdateOrderListDto {
  currentOrder: number,
  targetOrder: number,
}