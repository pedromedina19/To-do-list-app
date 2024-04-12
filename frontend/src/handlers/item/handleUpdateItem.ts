import { UpdateItemDto } from '../../interfaces/Iitem';
import { FormikHelpers } from 'formik';
import { updateItem } from '../../services/item-service';
import React from 'react';
import { List } from '../../interfaces/Ilist';


export default function handleUpdateItem(
  values: UpdateItemDto,
  actions: FormikHelpers<{
    titleItem: string,
    description: string | null,
    startDate: Date | null,
    finalDate: Date | null
  }>,
  id: number,
  listId: number,
  setLists: React.Dispatch<React.SetStateAction<List[]>>,
) {
  const dto = {
    titleItem: values.titleItem,
    description: values.description,
    startDate: values.startDate,
    finalDate: values.finalDate,
  };
  updateItem(id, dto)
    .then((response) => {
      return response;
    })
    .then((data) => {
      setLists((prevLists) => {
        return prevLists.map((list) => {
          if (list.id === listId) {
            return {
              ...list,
              items: list.items?.map((item) => {
                if (item.id === id) {
                  return { ...item, ...data.data };
                } else {
                  return item;
                }
              }),
            };
          } else {
            return list;
          }
        });
      });
    });
  actions.resetForm();
}