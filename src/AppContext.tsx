import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from './types';
import { loadData } from './store';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  users: User[];
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const data = loadData();
    setUsers(data.users);

    // Default to learner for demo
    const learner = data.users.find(u => u.role === 'learner');
    if (learner) {
      setCurrentUser(learner);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AppContext.Provider value={{ currentUser, setCurrentUser, users, darkMode, toggleDarkMode }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
