import { updateList } from '../../services/list-service';
import React from 'react';
import { List } from '../../interfaces/Ilist';

export default async function handleUpdateTitleList(
  id: number,
  title: string,
  setLists: React.Dispatch<React.SetStateAction<List[]>>,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
) {
  await updateList(id, title)
    .then((response) => {
      return response;
    })
    .then((data) => {
      setLists((prevLists) => prevLists.map(list => {
        if (list.id === id) {
          return { ...list, titleList: data.data.titleList };
        }
        return list;
      }));
    });
  setIsEditing(false);
}