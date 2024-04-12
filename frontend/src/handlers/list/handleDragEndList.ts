import { DragEndEvent } from '@dnd-kit/core';
import { updateOrderList } from '../../services/list-service';
import { reorderLists } from '../../utils/reorder-lists';
import React from 'react';
import { List } from '../../interfaces/Ilist';

export default async function handleDragEndList(event: DragEndEvent, lists: List[], setLists: React.Dispatch<React.SetStateAction<List[]>>) {
  const { active, over } = event;

  if (over) {
    if (active.id !== over.id) {
      const draggedList = lists.find(list => list.listOrder === (Number(active.id) - 1));
      const id = draggedList?.id;

      const dto = {
        currentOrder: Number(active.id) - 1,
        targetOrder: Number(over.id) - 1,
      };

      await updateOrderList(Number(id), dto)
        .then((response) => {
          return response;
        })
        .then((data) => {
          const reorderedLists = reorderLists(lists, dto.currentOrder, dto.targetOrder);
          setLists(reorderedLists);
        });
    }
  }
}