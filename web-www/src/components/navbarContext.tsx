import React from 'react';

const NavbarContext = React.createContext({});

export const UserProvider = NavbarContext.Provider;
export const UserConsumer = NavbarContext.Consumer;

export default NavbarContext;
