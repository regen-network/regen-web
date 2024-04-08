import { ReactNode, useCallback } from 'react';
import { Reorder } from 'framer-motion';

import FormLabel from '../FormLabel/FormLabel';

type Props<T> = {
  label: string;
  description: ReactNode;
  fields: Array<T>;
  move: (indexA: number, indexB: number) => void;
  getFieldElement: (field: T, index: number) => JSX.Element;
};

export const ReorderFields = <T extends { id: string }>({
  label,
  description,
  fields,
  move,
  getFieldElement,
}: Props<T>) => {
  const setFields = useCallback(
    (newOrder: any[]) => {
      let source = -1,
        destination = -1;
      for (let i = 0; i < newOrder.length; i++) {
        if (newOrder[i] !== fields[i]) {
          if (source < 0) {
            source = i;
          } else if (destination < 0) {
            destination = i;
            break;
          }
        }
      }
      move(source, destination);
    },
    [fields, move],
  );
  return (
    <>
      <FormLabel
        className="mb-[9px] mt-40"
        label={label}
        description={description}
      />
      <Reorder.Group
        axis="y"
        values={fields}
        onReorder={setFields}
        className="list-none pl-0"
      >
        {fields.map((field, index) => {
          const isLast = index === fields.length - 1;

          const fieldElement = getFieldElement(field, index);

          return isLast ? (
            fieldElement
          ) : (
            <Reorder.Item className="relative" key={field.id} value={field}>
              {fieldElement}
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </>
  );
};
