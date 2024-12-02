import { fireEvent, render, screen } from 'web-components/test/test-utils';

import { ViewMore } from './ViewMore';

describe('ViewMore', () => {
  const items = [
    <div key="1">Item 1</div>,
    <div key="2">Item 2</div>,
    <div key="3">Item 3</div>,
  ];
  const viewMoreText = 'View More';
  const viewLessText = 'View Less';

  test('renders without crashing', () => {
    render(
      <ViewMore
        items={items}
        viewMoreText={viewMoreText}
        viewLessText={viewLessText}
      />,
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  test('shows only one item initially', () => {
    render(
      <ViewMore
        items={items}
        viewMoreText={viewMoreText}
        viewLessText={viewLessText}
      />,
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Item 3')).not.toBeInTheDocument();
  });

  test('shows all items when "View More" is clicked', () => {
    render(
      <ViewMore
        items={items}
        viewMoreText={viewMoreText}
        viewLessText={viewLessText}
      />,
    );
    fireEvent.click(screen.getByText(`+ 2 ${viewMoreText}`));
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  test('hides items when "View Less" is clicked', () => {
    render(
      <ViewMore
        items={items}
        viewMoreText={viewMoreText}
        viewLessText={viewLessText}
      />,
    );
    fireEvent.click(screen.getByText(`+ 2 ${viewMoreText}`));
    fireEvent.click(screen.getByText(`- ${viewLessText}`));
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Item 3')).not.toBeInTheDocument();
  });

  test('respects the isOpen prop', () => {
    render(
      <ViewMore
        items={items}
        viewMoreText={viewMoreText}
        viewLessText={viewLessText}
        isOpen={true}
      />,
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  test('calls handleToggle when toggled', () => {
    const handleToggle = vi.fn();
    render(
      <ViewMore
        items={items}
        viewMoreText={viewMoreText}
        viewLessText={viewLessText}
        handleToggle={handleToggle}
        id={1}
      />,
    );
    fireEvent.click(screen.getByText(`+ 2 ${viewMoreText}`));
    expect(handleToggle).toHaveBeenCalledWith(1);
  });
});
