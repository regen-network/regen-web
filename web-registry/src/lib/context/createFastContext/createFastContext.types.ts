export interface CreateFastContextReturn<Store> {
  Provider: ({ children }: { children: React.ReactNode }) => JSX.Element;
  useStore: <SelectorOutput>(
    selector: (store: Store) => SelectorOutput,
  ) => [SelectorOutput, (value: Partial<Store>) => void];
}
