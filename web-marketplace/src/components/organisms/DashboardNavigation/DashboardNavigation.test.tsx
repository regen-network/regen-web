import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from 'web-marketplace/test/test-utils';

import DashboardNavigation from './DashboardNavigation';
import { getDashboardNavigationSections } from './DashboardNavigation.utils';

describe('DashboardNavigation', () => {
  // build the same mock data the real app will use
  const sections = getDashboardNavigationSections({ showOrders: true });
  const firstItem = sections[0].items[0]; // “Portfolio” by default
  const onNavClick = vi.fn();

  it('renders all section headings and item labels', () => {
    render(
      <DashboardNavigation
        sections={sections}
        currentPath="/none" // nothing active yet
        onNavItemClick={onNavClick}
        header={{
          name: 'Test User',
          address: '0x1234567890abcdef1234567890abcdef12345678',
          avatarSrc: 'https://example.com/avatar.png',
        }}
      />,
    );

    sections.forEach(section => {
      // heading
      expect(screen.getByText(section.heading)).toBeInTheDocument();
      // items
      section.items.forEach(item => {
        expect(screen.getByText(item.label)).toBeInTheDocument();
      });
    });
  });

  it('fires onNavItemClick with the path when an item is clicked', () => {
    render(
      <DashboardNavigation
        sections={sections}
        currentPath="/none"
        onNavItemClick={onNavClick}
        header={{
          name: 'Test User',
          address: '0x1234567890abcdef1234567890abcdef12345678',
          avatarSrc: 'https://example.com/avatar.png',
        }}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: firstItem.label }));
    expect(onNavClick).toHaveBeenCalledWith(firstItem.path);
  });

  it('highlights the button whose path === currentPath', () => {
    render(
      <DashboardNavigation
        sections={sections}
        currentPath={firstItem.path}
        onNavItemClick={onNavClick}
        header={{
          name: 'Test User',
          address: '0x1234567890abcdef1234567890abcdef12345678',
          avatarSrc: 'https://example.com/avatar.png',
        }}
      />,
    );

    const activeButton = screen.getByRole('button', { name: firstItem.label });

    // active state adds the bg class – adjust if you renamed it
    expect(activeButton).toHaveClass('bg-bc-primary-100');
  });

  it('still calls the callback when you click the already‑active item', () => {
    render(
      <DashboardNavigation
        sections={sections}
        currentPath={firstItem.path}
        onNavItemClick={onNavClick}
        header={{
          name: 'Test User',
          address: '0x1234567890abcdef1234567890abcdef12345678',
          avatarSrc: 'https://example.com/avatar.png',
        }}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: firstItem.label }));
    expect(onNavClick).toHaveBeenCalledWith(firstItem.path);
  });
});
