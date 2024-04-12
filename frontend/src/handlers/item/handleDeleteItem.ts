import { deleteItem } from '../../services/item-service';
import React from 'react';
import { List } from '../../interfaces/Ilist';

export default async function handleDeleteItem(
  id: number,
  setLists: React.Dispatch<React.SetStateAction<List[]>>,
) {
  await deleteItem(id)
    .then((response) => {
      return response;
    })
    .then((data) => {
      setLists((prevLists) => {
        return prevLists.map((list) => {
          if (list.id === data.data.listId) {
            const updatedItems = list.items
              ? list.items
                .filter((item) => item.id !== data.data.id)
                .map((item) => {
                  if (item.itemOrder > data.data.itemOrder) {
                    return { ...item, order: item.itemOrder - 1 };
                  }
                  return item;
                })
              : [];
            return {
              ...list,
              items: updatedItems,
            };
          } else {
            return list;
          }
        });
      });
    });
}
