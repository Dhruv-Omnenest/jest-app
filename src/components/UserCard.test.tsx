import { render, screen, waitFor } from '@testing-library/react';
import UserCard from './UserCard';
global.fetch = jest.fn();

describe('UserCard', () => {
  const mockedFetch = global.fetch as jest.Mock;

  beforeEach(() => {
    mockedFetch.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state initially', async () => {
    mockedFetch.mockReturnValue(new Promise(() => {}));

    render(<UserCard userId={1} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders user name after fetch completes', async () => {
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ name: 'Jane Doe' }),
    });

    render(<UserCard userId={1} />);

    const nameElement = await screen.findByText(/Jane Doe/i);
    expect(nameElement).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
  });

  it('handles fetch failure gracefully', async () => {
    
    mockedFetch.mockRejectedValueOnce(new Error('API Down'));
    render(<UserCard userId={1} />);
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
  });
});