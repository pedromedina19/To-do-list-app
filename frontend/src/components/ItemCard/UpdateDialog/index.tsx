import { Formik } from 'formik';
import { Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useListContext } from '../../../hooks/list-context';
import handleUpdateItem from '../../../handlers/item/handleUpdateItem';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addMinutes, setHours, setMinutes, setSeconds } from 'date-fns';

interface UpdateDialogProps {
  handleClose: () => void;
  open: boolean;
  id: number;
  titleItem: string;
  description: string | null;
  startDate: Date | null;
  finalDate: Date | null;
  listId: number;
}

type Error = {
  titleItem?: string;
  startDate?: string;
  finalDate?: string;
};

export default function UpdateDialog({
  handleClose,
  open,
  id,
  titleItem,
  description,
  startDate,
  finalDate,
  listId,
}: UpdateDialogProps) {
  const { lists, setLists } = useListContext();

  
  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md'>
      <Formik
        initialValues={{
          titleItem: titleItem,
          description: description,
          startDate: startDate ? addMinutes(new Date(startDate), new Date(startDate).getTimezoneOffset()) : null,
          finalDate: finalDate ? addMinutes(new Date(finalDate), new Date(finalDate).getTimezoneOffset()) : null,
        }}
        validate={(values) => {
          const errors: Error = {};
          if (!values.titleItem) {
            errors.titleItem = 'Título obrigatório';
          }

          if (values.startDate && values.finalDate) {
            if (values.finalDate < values.startDate) {
              errors.finalDate = 'Data final menor que a inicial';
            }
            if (values.startDate > values.finalDate) {
              errors.startDate = 'Data inicial maior que a final';
            }
          }
          return errors;
        }}
        onSubmit={async (values, actions) => {
          if (values.description == '') {
            values.description = null;
          }
          if (values.startDate) {
            values.startDate = setHours(setMinutes(setSeconds(values.startDate, 0), 0), 0);
          }
          if (values.finalDate) {
            values.finalDate = setHours(setMinutes(setSeconds(values.finalDate, 0), 0), 0);
          }
          await handleUpdateItem(values, actions, id, listId, setLists);
          handleClose();
        }}
      >
        {({ values, errors, touched, handleSubmit, setFieldValue }) => {
          return (
            <>
              <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <TextField
                    sx={{ width: '500px', marginBottom: '10px', marginTop: '10px' }}
                    label='Título'
                    variant='outlined'
                    size='small'
                    value={values.titleItem}
                    onChange={(value) => {
                      setFieldValue('titleItem', value.target.value);
                    }}
                    error={touched.titleItem && !!errors.titleItem}
                    helperText={touched.titleItem && errors.titleItem}
                  />
                  <TextField
                    label='Descrição'
                    multiline
                    rows={4}
                    fullWidth
                    sx={{ width: '500px', marginBottom: '10px' }}
                    value={values.description}
                    onChange={(value) => {
                      setFieldValue('description', value.target.value);
                    }}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label='Data Inicial'
                        maxDate={values.finalDate}
                        value={values.startDate}
                        onChange={(value) => {
                          setFieldValue('startDate', value);
                        }}
                        renderInput={(params) =>
                          <TextField
                            {...params}
                            sx={{ width: '245px' }}
                            error={touched.startDate && !!errors.startDate}
                            helperText={touched.startDate && errors.startDate}
                          />}
                      />
                      <DatePicker
                        label='Data Final'
                        minDate={values.startDate}
                        value={values.finalDate}
                        onChange={(value) => {
                          setFieldValue('finalDate', value);
                        }}
                        renderInput={(params) =>
                          <TextField
                            {...params}
                            sx={{ width: '245px' }}
                            error={touched.finalDate && !!errors.finalDate}
                            helperText={touched.finalDate && errors.finalDate}
                          />}
                      />
                    </LocalizationProvider>
                  </Box>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Salvar
                </Button>
              </DialogActions>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
}