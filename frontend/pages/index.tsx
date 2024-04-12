import * as React from 'react';
import { useEffect } from 'react';
import { getAllList } from '../src/services/list-service';
import { List } from '../src/interfaces/Ilist';
import ListCard from '../src/components/ListCard';
import { Grid } from '@mui/material';
import Navbar from '../src/components/Navbar';
import { useListContext } from '../src/hooks/list-context';
import AddList from '../src/components/AddList';
import Box from '@mui/material/Box';
import { closestCenter, DndContext } from '@dnd-kit/core';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import sensors from '../src/utils/sensors';
import handleDragEndList from '../src/handlers/list/handleDragEndList';


export default function Home() {
  const { lists, setLists } = useListContext();

  useEffect(() => {
    getAllList()
      .then((response) => {
        return response;
      })
      .then((data) => {
        const receivedLists: List[] = [];
        for (let i = 0; i < data.length; i++) {
          const list: List = {
            ...data[i],
          };
          receivedLists.push(list);
        }
        setLists(receivedLists);
      });
  }, []);

  return (
    <>
      <Navbar />
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={async (event) => {
          await handleDragEndList(event, lists, setLists);
        }}
        sensors={sensors()}
      >
        <Box
          style={{
            overflowX: 'auto',
            padding: '20px',
            height: 'calc(104vh - 90px)',
            boxSizing: 'border-box',
          }}
        >
          <Grid container spacing={2} style={{ flexWrap: 'nowrap' }}>
            {lists.map((list) => (
              <Grid item key={list.id} style={{ display: 'inline-flex', minWidth: '300px', alignSelf: 'flex-start' }}>
                <SortableContext
                  items={lists.map(list => list.listOrder + 1) || []}
                  strategy={horizontalListSortingStrategy}
                >
                  <ListCard
                    id={list.id}
                    titleList={list.titleList}
                    order={list.listOrder}
                    items={list.items}
                  />
                </SortableContext>
              </Grid>
            ))}

            <Grid item style={{ display: 'inline-flex', minWidth: '300px' }}>
              <AddList />
            </Grid>
          </Grid>
        </Box>
      </DndContext>
    </>
  );
}