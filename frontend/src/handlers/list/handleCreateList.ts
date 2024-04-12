import { createList } from '../../services/list-service';
import { FormikHelpers } from 'formik';
import { List } from '../../interfaces/Ilist';
import React from 'react';

export default async function handleCreateList(
  values: { titleList: string },
  actions: FormikHelpers<typeof values>,
  setLists: React.Dispatch<React.SetStateAction<List[]>>,
) {
  createList(values.titleList)
    .then((response) => {
      return response;
    })
    .then((data) => {
      setLists(prevLists => [...prevLists, { ...data.data, items: [] }]);
    });
  actions.resetForm();
}