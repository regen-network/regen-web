import { createContext, ReactNode, useContext } from 'react';

interface NavigationContextType {
  collapsed: boolean;
}

const NavigationContext = createContext<NavigationContextType>({
  collapsed: false,
});

export const useNavigation = () => useContext(NavigationContext);

interface NavigationProviderProps {
  children: ReactNode;
  collapsed: boolean;
}

export const NavigationProvider = ({
  children,
  collapsed,
}: NavigationProviderProps) => (
  <NavigationContext.Provider value={{ collapsed }}>
    {children}
  </NavigationContext.Provider>
);
