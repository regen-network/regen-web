import { createContext, useContext } from 'react';
import { DeliverTxResponse } from '@cosmjs/stargate';

type ContextType = {
  deliverTxResponse?: DeliverTxResponse;
};

const initialValues = {
  deliverTxResponse: undefined,
};

const CreateProjectContext = createContext<ContextType>(initialValues);

const useCreateProjectContext = (): ContextType =>
  useContext(CreateProjectContext);

export { useCreateProjectContext };
