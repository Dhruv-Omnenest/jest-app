import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

describe('Counter Component', () => {

  it('displays initial count of 0', () => {
    render(<Counter />);
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });

  it('increments count when Increment is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter />);

    await user.click(screen.getByRole('button', { name: 'Increment' }));

    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });

  it('decrements count when Decrement is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter />);

    await user.click(screen.getByRole('button', { name: 'Decrement' }));

    expect(screen.getByText('Count: -1')).toBeInTheDocument();
  });

  it('resets count when Reset is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter />);

    await user.click(screen.getByRole('button', { name: 'Increment' }));
    await user.click(screen.getByRole('button', { name: 'Increment' }));
    await user.click(screen.getByRole('button', { name: 'Reset' }));

    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });
});
