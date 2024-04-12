import { deleteList } from '../../services/list-service';
import React from 'react';
import { List } from '../../interfaces/Ilist';

export default async function handleDeleteList(id: number, setLists: React.Dispatch<React.SetStateAction<List[]>>) {
  await deleteList(id)
    .then((response) => {
      return response;
    }).then((data) => {
      setLists((prevLists) => {
        return prevLists
          .filter((list) => list.id !== data.data.id)
          .map((list) => {
            if (list.listOrder > data.data.listOrder) {
              return { ...list, listOrder: list.listOrder - 1 };
            }
            return list;
          });
      });
    });
}