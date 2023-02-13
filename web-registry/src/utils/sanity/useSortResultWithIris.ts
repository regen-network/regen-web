type UseSortResultWithIrisParams<T> = {
  iris?: string | string[] | null;
  dataWithIris?: T[];
};

type DataWithIrisType = { iri: { current: string } };

function isDataWithIrisType(data: any): data is DataWithIrisType {
  return (data as DataWithIrisType).iri.current !== undefined;
}

// sanity does not preserve order of queries with iris
// so we need to sort the response based on the initial order of the iris
export const useSortResultWithIris = <T>({
  iris,
  dataWithIris = [],
}: UseSortResultWithIrisParams<T>): T[] => {
  const initialIrisList = iris ?? [];
  const dataWithIrisList = [...dataWithIris];

  if (typeof iris === 'string') {
    iris = [iris];
  }
  if (Array.isArray(iris)) {
    return dataWithIrisList?.sort((impactA, impactB) => {
      if (isDataWithIrisType(impactA) && isDataWithIrisType(impactB)) {
        return (
          initialIrisList.indexOf(impactA.iri?.current ?? '') -
          initialIrisList.indexOf(impactB.iri?.current ?? '')
        );
      }
      return 0;
    });
  }

  return dataWithIrisList;
};
