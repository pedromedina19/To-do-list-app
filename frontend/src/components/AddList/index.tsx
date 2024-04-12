import { IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Formik } from 'formik';
import * as React from 'react';
import { useListContext } from '../../hooks/list-context';
import handleCreateList from '../../handlers/list/handleCreateList';

type Error = {
  titleList?: string;
};

export default function AddList() {
  const { lists, setLists } = useListContext();

  return (
    <Formik
      initialValues={{ titleList: '' }}
      validate={(values) => {
        const errors: Error = {};
        if (!values.titleList) {
          errors.titleList = 'Título obrigatório';
        }
        return errors;
      }}
      onSubmit={async (values, actions) => {
        await handleCreateList(values, actions, setLists);
      }}>
      {({ values, errors, touched, handleSubmit, setFieldValue }) => {
        return (
          <>
            <TextField
              style={{ marginTop: '2px' }}
              inputProps={{ style: { fontSize: '14px' } }}
              InputLabelProps={{ style: { fontSize: '14px' } }}
              id='outlined-basic'
              label='Adicionar lista'
              variant='outlined'
              size='small'
              value={values.titleList}
              onChange={(value) => {
                setFieldValue('titleList', value.target.value);
              }}
              error={touched.titleList && !!errors.titleList}
              helperText={touched.titleList && errors.titleList}
            />
            <IconButton
              style={{ height: '40px', marginLeft: '8px' }}
              sx={{ color: '#0a70ff' }}
              onClick={() => {
                handleSubmit();
              }}
            >
              <AddIcon sx={{ color: '#0a70ff' }} />
            </IconButton>
          </>
        );
      }}
    </Formik>
  );
}