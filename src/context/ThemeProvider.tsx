import React, { createContext, ReactNode, useContext, useState } from 'react';

/**
 * Интерфейс контекста темы.
 */
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Хук для использования контекста.
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('Somthing went wrong...');
  }

  return context;
};

/**
 * Интерфейс компонента провайдера темы.
 */
interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Компонент провайдера темы.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};
