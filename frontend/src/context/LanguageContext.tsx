import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LanguageMode } from '../types';

interface LanguageContextType {
  mode: LanguageMode;
  setMode: (mode: LanguageMode) => void;
  t: (hi: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<LanguageMode>('hi');

  // Always return Hindi text only (Pure Hindi mode)
  const t = (hi: string, _en?: string): string => {
    return hi;
  };

  return (
    <LanguageContext.Provider value={{ mode, setMode, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
