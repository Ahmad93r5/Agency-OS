import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Clients from '@/app/workspaces/[workspaceId]/clients/page';

jest.mock('@/lib/api', () => ({
  apiRequest: jest.fn()
}));

describe('Clients Component', () => {
  const mockClients = [
    { id: 1, name: 'Ahmed', email: 'ahmed@email.com', phone: '123' },
    { id: 2, name: 'Sara', email: 'sara@email.com', phone: '456' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders clients list', async () => {
    const { apiRequest } = require('@/lib/api');
    apiRequest.mockResolvedValue(mockClients);
    render(<Clients />);
    await waitFor(() => {
      expect(screen.getByText('Ahmed')).toBeInTheDocument();
    });
  });

  test('shows loading state', () => {
    const { apiRequest } = require('@/lib/api');
    apiRequest.mockImplementation(() => new Promise(() => {}));
    render(<Clients />);
    expect(screen.getByText('Loading clients...')).toBeInTheDocument();
  });

  test('shows error message on API failure', async () => {
    const { apiRequest } = require('@/lib/api');
    apiRequest.mockRejectedValue(new Error('Network error'));
    render(<Clients />);
    await waitFor(() => {
      expect(screen.getByText('Failed to load clients. Please refresh the page.')).toBeInTheDocument();
    });
  });

  test('shows empty state when no clients', async () => {
    const { apiRequest } = require('@/lib/api');
    apiRequest.mockResolvedValue([]);
    render(<Clients />);
    await waitFor(() => {
      expect(screen.getByText('No clients yet. Create your first client!')).toBeInTheDocument();
    });
  });

  test('opens add client modal on button click', async () => {
    const { apiRequest } = require('@/lib/api');
    apiRequest.mockResolvedValue([]);
    render(<Clients />);
    await userEvent.click(screen.getByText('+ Add Client'));
    expect(screen.getByText('Add New Client')).toBeInTheDocument();
  });

  test('submits add client form', async () => {
    const { apiRequest } = require('@/lib/api');
    apiRequest.mockResolvedValue([]);
    render(<Clients />);
    await userEvent.click(screen.getByText('+ Add Client'));
    
    const nameInputs = screen.getAllByPlaceholderText('Enter client name');
    const emailInputs = screen.getAllByPlaceholderText('Enter client email');
    const phoneInputs = screen.getAllByPlaceholderText('Enter client phone (optional)');
    
    await userEvent.type(nameInputs[0], 'Ali');
    await userEvent.type(emailInputs[0], 'ali@email.com');
    await userEvent.type(phoneInputs[0], '789');
    
    const saveButtons = screen.getAllByText('Save');
    await userEvent.click(saveButtons[0]);
    
    await waitFor(() => {
      expect(apiRequest).toHaveBeenCalledWith(
        '/workspaces/6/clients',
        expect.objectContaining({ method: 'POST' })
      );
    });
  });

  test('opens edit modal on edit button click', async () => {
    const { apiRequest } = require('@/lib/api');
    apiRequest.mockResolvedValue(mockClients);
    render(<Clients />);
    await waitFor(() => {
      expect(screen.getByText('Ahmed')).toBeInTheDocument();
    });
    const editButtons = screen.getAllByText('Edit');
    await userEvent.click(editButtons[0]);
    expect(screen.getByText('Edit Client')).toBeInTheDocument();
  });

  test('opens delete confirmation on delete button click', async () => {
    const { apiRequest } = require('@/lib/api');
    apiRequest.mockResolvedValue(mockClients);
    render(<Clients />);
    await waitFor(() => {
      expect(screen.getByText('Ahmed')).toBeInTheDocument();
    });
    const deleteButtons = screen.getAllByText('Delete');
    await userEvent.click(deleteButtons[0]);
    expect(screen.getByText('Delete Client')).toBeInTheDocument();
  });

  // ✅ FIXED TEST
  test('closes modal on cancel button click', async () => {
    const { apiRequest } = require('@/lib/api');
    apiRequest.mockResolvedValue([]);

    render(<Clients />);

    await userEvent.click(screen.getByText('+ Add Client'));
    expect(screen.getByText('Add New Client')).toBeInTheDocument();

    const cancelButtons = screen.getAllByText('Cancel');
    await userEvent.click(cancelButtons[0]);

    // ✅ Check open attribute removed
    await waitFor(() => {
      const dialog = document.querySelector('dialog');
      expect(dialog).not.toHaveAttribute('open');
    }, { timeout: 2000 });

    // ✅ Check dialog has display: none
    await waitFor(() => {
      const dialog = document.querySelector('dialog');
      expect(dialog).toHaveStyle('display: none');
    }, { timeout: 2000 });
  });

  test('closes error message on close button click', async () => {
    const { apiRequest } = require('@/lib/api');
    apiRequest.mockRejectedValue(new Error('Network error'));
    render(<Clients />);
    await waitFor(() => {
      expect(screen.getByText('Failed to load clients. Please refresh the page.')).toBeInTheDocument();
    });
    await userEvent.click(screen.getByText('✕'));
    expect(screen.queryByText('Failed to load clients. Please refresh the page.')).not.toBeInTheDocument();
  });
});