import { fireEvent, render, screen } from 'web-marketplace/test/test-utils';

import { AdminNavigation } from './AdminNavigation';
import { adminNavigationSections } from './AdminNavigation.constants';

describe('AdminNavigation', () => {
  const sections = adminNavigationSections;
  const item = sections[0].items[0];
  const onNavClick = vi.fn();
  it('renders navigation sections and items', () => {
    render(
      <AdminNavigation
        sections={sections}
        currentPath="current-section"
        onNavItemClick={onNavClick}
        savedPaymentInfo={true}
      />,
    );

    sections.forEach(section => {
      expect(screen.getByText(section.heading)).toBeInTheDocument();
      section.items.forEach(item => {
        expect(screen.getByText(item.name)).toBeInTheDocument();
      });
    });
  });

  it('calls onNavItemClick when an item is clicked', () => {
    render(
      <AdminNavigation
        sections={sections}
        currentPath="current-section"
        onNavItemClick={onNavClick}
        savedPaymentInfo={true}
      />,
    );

    fireEvent.click(screen.getByText(item.name));
    expect(onNavClick).toHaveBeenCalledWith(item.path);
  });

  it('highlights the current path', () => {
    render(
      <AdminNavigation
        sections={sections}
        currentPath={item.path}
        onNavItemClick={onNavClick}
        savedPaymentInfo={true}
      />,
    );

    const listItemButton = screen.getByRole('button', { name: item.name });
    expect(listItemButton).toHaveClass('Mui-selected');
  });

  it('navigates to the correct path when an item is clicked', () => {
    render(
      <AdminNavigation
        sections={sections}
        currentPath={item.path}
        onNavItemClick={onNavClick}
        savedPaymentInfo={true}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: item.name }));
    expect(onNavClick).toHaveBeenCalledWith(item.path);
  });
});
