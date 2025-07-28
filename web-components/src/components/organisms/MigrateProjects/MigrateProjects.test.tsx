import { describe, expect, it, vi } from 'vitest';

import {
  fireEvent,
  render,
  screen,
  userEvent,
  waitFor,
} from '../../../../test/test-utils';
import { MigrateProjects } from './MigrateProjects';
import { Project } from './MigrateProjects.types';

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Project Alpha',
    imageSrc: 'alpha.jpg',
    location: 'Location A',
    area: '100 ha.',
  },
  {
    id: '2',
    title: 'Project Beta',
    imageSrc: 'beta.jpg',
    location: 'Location B',
    area: '200 ha.',
  },
  {
    id: '3',
    title: 'Project Gamma',
    imageSrc: 'gamma.jpg',
    location: 'Location C',
    area: '300 ha.',
  },
];

describe('MigrateProjects', () => {
  it('renders all projects and none are selected initially', () => {
    render(<MigrateProjects projects={mockProjects} onSubmit={vi.fn()} />);

    expect(screen.getByText('Project Alpha')).toBeInTheDocument();
    expect(screen.getByText('Project Beta')).toBeInTheDocument();
    expect(screen.getByText('Project Gamma')).toBeInTheDocument();

    const selectedIcons = screen.queryAllByTestId('success-icon');
    expect(selectedIcons).toHaveLength(0);
  });

  it('selects and deselects a project on click', async () => {
    const user = userEvent.setup();
    render(<MigrateProjects projects={mockProjects} onSubmit={vi.fn()} />);

    const projectAlpha = screen.getByLabelText('Project Alpha');

    // Select
    await user.click(projectAlpha);
    expect(screen.getAllByTestId('success-icon')).toHaveLength(1);

    // Deselect
    await user.click(projectAlpha);
    expect(screen.queryAllByTestId('success-icon')).toHaveLength(0);
  });

  it('allows multiple projects to be selected', async () => {
    const user = userEvent.setup();
    render(<MigrateProjects projects={mockProjects} onSubmit={vi.fn()} />);

    await user.click(screen.getByLabelText('Project Alpha'));
    await user.click(screen.getByLabelText('Project Beta'));

    expect(screen.getAllByTestId('success-icon')).toHaveLength(2);
  });

  it('submits the selected project IDs', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<MigrateProjects projects={mockProjects} onSubmit={handleSubmit} />);

    await user.click(screen.getByLabelText('Project Alpha'));
    await user.click(screen.getByLabelText('Project Gamma'));

    // The form needs a submit button to trigger the submission
    // Since there isn't one, we'll find the form by its accessible name and trigger a submit event
    const form = screen.getByRole('form', { name: 'migrate projects form' });
    fireEvent.submit(form);

    // react-hook-form's submit is asynchronous
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      const submittedData = handleSubmit.mock.calls[0][0];
      expect(submittedData.selectedProjectIds).toHaveLength(2);
      expect(submittedData.selectedProjectIds).toEqual(
        expect.arrayContaining(['1', '3']),
      );
    });
  });

  it('renders nothing when no projects are provided', () => {
    const { container } = render(
      <MigrateProjects projects={[]} onSubmit={vi.fn()} />,
    );
    expect(container.firstChild).not.toBeNull(); // The section and form will render
    expect(screen.queryByText(/Project/)).not.toBeInTheDocument();
  });
});
