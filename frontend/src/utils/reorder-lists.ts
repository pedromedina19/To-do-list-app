import { List } from '../interfaces/Ilist';

export function reorderLists(lists: List[], currentOrder: number, targetOrder: number): List[] {
  const result = Array.from(lists);
  const [moved] = result.splice(currentOrder, 1);
  result.splice(targetOrder, 0, moved);

  return result.map((list, index) => ({
    ...list,
    order: index,
  }));
}
