import { useCallback, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { ViewMore } from './ViewMore';

export default {
  title: 'ViewMore',
  component: ViewMore,
} as Meta<typeof ViewMore>;

type Story = StoryObj<typeof ViewMore>;

const items = [
  <div key="1">Item 1</div>,
  <div key="2">Item 2</div>,
  <div key="3">Item 3</div>,
];
const viewMoreText = 'View More';
const viewLessText = 'View Less';

export const Single: Story = {
  render: args => <ViewMore {...args} />,
};

Single.args = {
  items,
  viewMoreText,
  viewLessText,
};

const ViewMoreGroup = (props: any) => {
  const [viewMoreState, setViewMoreState] = useState<{
    [key: number]: boolean;
  }>();

  const viewMoreHandleToggle = useCallback((id: number) => {
    setViewMoreState(prevState => ({
      ...prevState,
      [id]: !prevState?.[id],
    }));
  }, []);
  return (
    <div className="flex flex-row justify-around">
      <ViewMore
        {...props}
        id={1}
        handleToggle={viewMoreHandleToggle}
        isOpen={!!viewMoreState?.[1]}
      />
      <ViewMore
        {...props}
        id={1}
        handleToggle={viewMoreHandleToggle}
        isOpen={!!viewMoreState?.[1]}
      />
      <ViewMore
        {...props}
        id={1}
        handleToggle={viewMoreHandleToggle}
        isOpen={!!viewMoreState?.[1]}
      />
      <ViewMore
        {...props}
        id={1}
        handleToggle={viewMoreHandleToggle}
        isOpen={!!viewMoreState?.[1]}
      />
    </div>
  );
};

export const Group: Story = {
  render: args => <ViewMoreGroup {...args} />,
};

Group.args = {
  items,
  viewMoreText,
  viewLessText,
};
