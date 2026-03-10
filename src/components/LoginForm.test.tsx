import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

describe('LoginForm', () => {

  it('calls onSubmit with email and password', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();   // create a mock function
    render(<LoginForm onSubmit={mockSubmit} />);

    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'secret123');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(mockSubmit).toHaveBeenCalledWith('test@example.com', 'secret123');
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });
});
