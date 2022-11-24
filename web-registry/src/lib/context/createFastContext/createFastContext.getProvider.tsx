import {
  useStoreData,
  UseStoreDataReturn,
} from './hooks/createFastContext.useStoreData';

type GetFastContextProviderParams<Store> = {
  StoreContext: React.Context<UseStoreDataReturn<Store> | null>;
  initialState: Store;
};

interface FastContextProviderProps {
  children: React.ReactNode;
}

type FastContextProviderReturn = ({
  children,
}: FastContextProviderProps) => JSX.Element;

export function getFastContextProvider<Store>({
  StoreContext,
  initialState,
}: GetFastContextProviderParams<Store>): FastContextProviderReturn {
  const FastContextProvider = ({
    children,
  }: FastContextProviderProps): JSX.Element => {
    return (
      <StoreContext.Provider value={useStoreData<Store>({ initialState })}>
        {children}
      </StoreContext.Provider>
    );
  };

  return FastContextProvider;
}
