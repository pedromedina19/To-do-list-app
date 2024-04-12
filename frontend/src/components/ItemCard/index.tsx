import { Card, CardContent, IconButton, Typography } from '@mui/material';
import * as React from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useListContext } from '../../hooks/list-context';
import ConfirmationDialog from '../common/ConfirmationDialog';
import UpdateDialog from './UpdateDialog';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import handleCloseDialog from '../../handlers/dialog/handleCloseDialog';
import handleOpenDialog from '../../handlers/dialog/handleOpenDialog';
import handleDeleteItem from '../../handlers/item/handleDeleteItem';


interface ItemCardProps {
  id: number;
  titleItem: string;
  description: string | null;
  startDate: Date | null;
  finalDate: Date | null;
  order: number;
  listId: number;
}

export default function ItemCard({
  id,
  titleItem,
  description,
  startDate,
  finalDate,
  order,
  listId,
}: ItemCardProps) {
  const [openUpdate, setOpenUpdate] = React.useState<boolean>(false);
  const [openDelete, setOpenDelete] = React.useState<boolean>(false);
  const { lists, setLists } = useListContext();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: order + 1 });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <Card variant='outlined' sx={{ borderRadius: '6px', marginBottom: '5px' }}>
          <CardContent sx={{ padding: '5px', display: 'flex', alignItems: 'center' }}>
            <Typography
              sx={{
                fontFamily: 'monospace',
                color: '#706e6e',
                fontSize: '12px',
                flexGrow: 1,
                maxWidth: '180px',
              }}>
              {titleItem}
            </Typography>
            <IconButton
              size='small'
              onClick={() => {
                handleOpenDialog(setOpenUpdate);
              }}
              sx={{ alignSelf: 'self-start' }}
            >
              <ModeEditIcon fontSize='small' />
            </IconButton>
            <IconButton
              size='small'
              onClick={() => {
                handleOpenDialog(setOpenDelete);
              }}
              sx={{ alignSelf: 'self-start' }}
            >
              <DeleteIcon fontSize='small' />
            </IconButton>
          </CardContent>
        </Card>
      </div>

      <UpdateDialog
        handleClose={() => {
          handleCloseDialog(setOpenUpdate);
        }}
        open={openUpdate}
        id={id}
        titleItem={titleItem}
        description={description}
        startDate={startDate}
        finalDate={finalDate}
        listId={listId}
      />

      <ConfirmationDialog
        handleDelete={async () => {
          await handleDeleteItem(id, setLists);
        }}
        handleClose={() => {
          handleCloseDialog(setOpenDelete);
        }}
        open={openDelete}
        message='Tem certeza que deseja deletar esse item?'
        title={titleItem}
      />
    </>
  );
}