import { Card, CardContent, IconButton, Typography } from '@mui/material';
import * as React from 'react';
import { CSSProperties, useState } from 'react';
import { Item } from '../../interfaces/Iitem';
import ItemCard from '../ItemCard';
import { useListContext } from '../../hooks/list-context';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import Box from '@mui/material/Box';
import ConfirmationDialog from '../common/ConfirmationDialog';
import AddItem from './AddItem';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { closestCenter, DndContext } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import sensors from '../../utils/sensors';
import handleOpenDialog from '../../handlers/dialog/handleOpenDialog';
import handleCloseDialog from '../../handlers/dialog/handleCloseDialog';
import handleDragEndItem from '../../handlers/item/handleDragEndItem';
import handleDeleteList from '../../handlers/list/handleDeleteList';
import UpdateTitle from './UpdateTitle';


interface ListCardProps {
  id: number;
  titleList: string;
  order: number;
  items?: Item[] | null;
}

const cardStyle: CSSProperties = {
  width: '100%',
  maxHeight: 'calc(96vh - 96px)',
  overflowY: 'auto',
};

export default function ListCard({ id, titleList, order, items }: ListCardProps) {
  const { lists, setLists } = useListContext();
  const [openDelete, setOpenDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
    height: '200px',
  };

  return (
    <>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={async (event) => {
          await handleDragEndItem(event, id, setLists, items);
        }}
        sensors={sensors()}
      >
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
        >
          <Card style={cardStyle} variant='outlined' sx={{ borderRadius: '10px' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                {isEditing ? (
                  <UpdateTitle id={id} titleList={titleList} setLists={setLists} setIsEditing={setIsEditing} />
                ) : (
                  <Typography
                    sx={{ fontFamily: 'monospace', fontWeight: 600, color: '#706e6e', flexGrow: 1 }}
                    onClick={() => {
                      setIsEditing(true);
                    }}
                  >
                    {titleList}
                  </Typography>
                )}

                <IconButton
                  size='small'
                  onClick={() => {
                    handleOpenDialog(setOpenDelete);
                  }}
                  sx={{ alignSelf: 'self-start', marginRight: '5px' }}
                >
                  <PlaylistRemoveIcon fontSize='small' />
                </IconButton>
              </Box>

              <SortableContext
                items={items?.map(item => item.itemOrder + 1) || []}
                strategy={verticalListSortingStrategy}
              >
                {items?.map((item) => (
                  <ItemCard
                    key={item.id}
                    id={item.id}
                    titleItem={item.titleItem}
                    description={item.description}
                    startDate={item.startDate}
                    finalDate={item.finalDate}
                    order={item.itemOrder}
                    listId={item.listId}
                  />
                ))}
              </SortableContext>

              <AddItem
                id={id}
                order={order}
              />
            </CardContent>
          </Card>
        </div>
      </DndContext>

      <ConfirmationDialog
        handleDelete={async () => {
          await handleDeleteList(id, setLists);
        }}
        handleClose={() => {
          handleCloseDialog(setOpenDelete);
        }}
        open={openDelete}
        message='Tem certeza que deseja deletar essa lista?'
        title={titleList}
      />
    </>
  );
}