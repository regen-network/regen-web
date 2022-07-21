import { createContext, ReactNode, useContext, useState } from 'react';
import { DeliverTxResponse } from '@cosmjs/stargate';

type ContextType = {
  deliverTxResponse?: DeliverTxResponse;
};

export const CreateProjectContext = createContext<ContextType>(
  {} as ContextType,
);

const CreateProjectProvider = (props: { children: ReactNode }): JSX.Element => {
  const [deliverTxResponse /* , setDeliverTxResponse */] =
    useState<DeliverTxResponse>();
  return (
    <CreateProjectContext.Provider value={{ deliverTxResponse }}>
      {props.children}
    </CreateProjectContext.Provider>
  );
};

const useCreateProjectContext = (): ContextType => {
  const context = useContext(CreateProjectContext);
  if (context === undefined) {
    throw new Error(
      'useCreateProjectContext must be used within a ProjectProvider',
    );
  }
  return context;
};

export { useCreateProjectContext, CreateProjectProvider };
