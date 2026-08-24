// jest.setup.cjs
require('@testing-library/jest-dom');

// ✅ Dialog mock — Properly working
beforeEach(() => {
  // Show modal mock
  HTMLDialogElement.prototype.showModal = jest.fn(function() {
    this.open = true;
    this.setAttribute('open', '');
    this.style.display = 'block';
  });
  
  // Close modal mock — Properly removes open attribute
  HTMLDialogElement.prototype.close = jest.fn(function() {
    this.open = false;
    this.removeAttribute('open');
    this.style.display = 'none';
  });
});

// ✅ Next.js navigation mock — Properly returns workspaceId
jest.mock('next/navigation', () => ({
  useParams: jest.fn(() => ({ workspaceId: '6' })),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  })),
}));

// ✅ localStorage mock
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(() => 'mock-token'),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
  writable: true,
});

// ✅ fetch mock
global.fetch = jest.fn();

// ✅ console.error mock — Clean up test output
jest.spyOn(console, 'error').mockImplementation(() => {});