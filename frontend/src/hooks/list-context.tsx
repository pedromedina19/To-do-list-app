import React, { createContext, ReactNode, useContext, useState } from 'react';
import { List } from '../interfaces/Ilist';

interface ListContextType {
  lists: List[];
  setLists: React.Dispatch<React.SetStateAction<List[]>>;
}


const ListContext = createContext<ListContextType | undefined>(undefined);

export const useListContext = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error('useListContext must be used within a ListProvider');
  }
  return context;
};

interface ListProviderProps {
  children: ReactNode;
}

export const ListProvider: React.FC<ListProviderProps> = ({ children }: ListProviderProps) => {
  const [lists, setLists] = useState<List[]>([]);

  return (
    <ListContext.Provider value={{ lists, setLists }}>
      {children}
    </ListContext.Provider>
  );
};
