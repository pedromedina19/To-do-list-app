import { Item } from '../interfaces/Iitem';

export function reorderItems(items: Item[], currentOrder: number, targetOrder: number) {
  const result = Array.from(items);
  const [moved] = result.splice(currentOrder, 1);
  result.splice(targetOrder, 0, moved);

  
  return result.map((item, index) => ({
    ...item,
    order: index,
  }));
}