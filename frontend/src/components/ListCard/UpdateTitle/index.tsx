import handleUpdateTitleList from '../../../handlers/list/handleUpdateTitleList';
import { IconButton, TextField } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Formik } from 'formik';
import * as React from 'react';
import { List } from '../../../interfaces/Ilist';

interface UpdateTitleProps {
  id: number,
  titleList: string,
  setLists: React.Dispatch<React.SetStateAction<List[]>>,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

type Error = {
  titleList?: string;
};

export default function UpdateTitle({ id, titleList, setLists, setIsEditing }: UpdateTitleProps) {
  return (
    <Formik
      initialValues={{ titleList: titleList }}
      validate={(values) => {
        const errors: Error = {};
        if (!values.titleList) {
          errors.titleList = 'Título obrigatório';
        }
        return errors;
      }}
      onSubmit={async (values) => {
        await handleUpdateTitleList(id, values.titleList, setLists, setIsEditing);
      }}>
      {({ values, errors, touched, handleSubmit, setFieldValue }) => {
        return (
          <>
            <TextField
              value={values.titleList}
              label='Atualizar título'
              size='small'
              style={{ height: '40px', width: '165px' }}
              inputProps={{ style: { fontSize: '12px' } }}
              InputLabelProps={{ style: { fontSize: '12px' } }}
              onChange={(value) => {
                setFieldValue('titleList', value.target.value);
              }}
              error={touched.titleList && !!errors.titleList}
              helperText={touched.titleList && errors.titleList}
            />
            <IconButton
              style={{ height: '40px', marginLeft: '2px', marginRight: '5px' }}
              sx={{ color: '#0a70ff' }}
              size='small'
              onClick={() => {
                handleSubmit();
              }}
            >
              <CheckCircleIcon fontSize='small' sx={{ color: '#0a70ff' }} />
            </IconButton>
          </>
        );
      }}
    </Formik>
  );
}
