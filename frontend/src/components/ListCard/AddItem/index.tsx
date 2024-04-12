import { IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Formik } from 'formik';
import * as React from 'react';
import { useListContext } from '../../../hooks/list-context';
import handleCreateItem from '../../../handlers/item/handleCreateItem';

interface AddItemProps {
  id: number;
  order: number;
}


type Error = {
  titleItem?: string;
};

export default function AddItem({ id, order }: AddItemProps) {
  const { lists, setLists } = useListContext();

  return (
    <Formik
      initialValues={{
        titleItem: '',
      }}
      validate={(values) => {
        const errors: Error = {};
        if (!values.titleItem) {
          errors.titleItem = 'Título obrigatório';
        }
        return errors;
      }}
      onSubmit={async (values, actions) => {
        await handleCreateItem(values, actions, id, order, lists, setLists);
      }}
    >
      {({ values, errors, touched, handleSubmit, setFieldValue }) => {
        return (
          <>
            <TextField
              style={{ marginTop: '5px', width: '194px' }}
              inputProps={{ style: { fontSize: '12px' } }}
              InputLabelProps={{ style: { fontSize: '12px' } }}
              label='Adicionar item'
              variant='outlined'
              size='small'
              value={values.titleItem}
              onChange={(value) => {
                setFieldValue('titleItem', value.target.value);
              }}
              error={touched.titleItem && !!errors.titleItem}
              helperText={touched.titleItem && errors.titleItem}
            />
            <IconButton
              style={{ height: '40px', marginLeft: '5px' }}
              sx={{ color: '#ff700a' }}
              onClick={() => {
                handleSubmit();
              }}
            >
              <AddIcon fontSize='small' sx={{ color: '#ff700a' }} />
            </IconButton>
          </>
        );
      }}
    </Formik>
  );
}