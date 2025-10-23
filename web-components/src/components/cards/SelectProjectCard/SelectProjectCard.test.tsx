import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SelectProjectCard } from './SelectProjectCard';
import { Project } from './SelectProjectCard.types';

const mockProject: Project = {
  id: '1',
  name: 'Test Project',
  imgSrc: '/path/to/image.jpg',
  place: 'Test Location',
  area: 100,
  areaUnit: 'hectares',
  program: {
    id: 'program-1',
    name: 'Test Program',
    address: 'regen123...',
    type: 'ORGANIZATION',
    image: 'https://via.placeholder.com/150',
  },
};

describe('SelectProjectCard', () => {
  it('renders project information correctly', () => {
    render(<SelectProjectCard project={mockProject} />);

    expect(screen.getByText(mockProject.name)).toBeInTheDocument();
    expect(screen.getByText(mockProject.place)).toBeInTheDocument();
    expect(screen.getByText(/1,000\s*ha\./)).toBeInTheDocument();
  });

  it('displays as selected when the selected prop is true', () => {
    const { container } = render(
      <SelectProjectCard project={mockProject} selected />,
    );

    const label = container.firstChild;
    expect(label).toHaveClass('outline-brand-400');

    const successIcon = screen.getByTestId('success-icon');
    expect(successIcon).toBeInTheDocument();
  });

  it('does not display as selected when the selected prop is false', () => {
    const { container } = render(
      <SelectProjectCard project={mockProject} selected={false} />,
    );

    const label = container.firstChild;
    expect(label).not.toHaveClass('outline-brand-400');
    expect(label).toHaveClass('outline-grey-300');

    const successIcon = screen.queryByTestId('success-icon');
    expect(successIcon).not.toBeInTheDocument();
  });

  it('calls the onClick handler when the card is clicked', () => {
    const handleClick = vi.fn();
    render(<SelectProjectCard project={mockProject} onClick={handleClick} />);

    const checkbox = screen.getByLabelText(mockProject.name);
    checkbox.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(mockProject.id);
  });

  it('has the correct accessibility attributes', () => {
    render(<SelectProjectCard project={mockProject} />);

    const checkbox = screen.getByRole('checkbox', { name: mockProject.name });
    expect(checkbox).toBeInTheDocument();

    const label = checkbox.closest('label');
    expect(label).toHaveAttribute(
      'for',
      `select-project-card-${mockProject.id}`,
    );
    expect(checkbox).toHaveAttribute(
      'id',
      `select-project-card-${mockProject.id}`,
    );
  });

  it('renders correctly even if area is not provided', () => {
    const projectWithoutArea = { ...mockProject, area: undefined };
    render(<SelectProjectCard project={projectWithoutArea} />);

    expect(screen.getByText(mockProject.name)).toBeInTheDocument();
    expect(screen.queryByText('hectares')).not.toBeInTheDocument();
  });
});
