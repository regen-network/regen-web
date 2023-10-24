import { createContext, useContext } from 'react';

export type AuthContextType = {
  error?: unknown;
  accountId?: string;
};

const AuthContext = createContext<AuthContextType>({});

export const AuthProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => useContext(AuthContext);
