/*import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/lKeerthi   College G.pulla Reedy Engg. College/i);
  expect(linkElement).toBeInTheDocument();
});*/
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders my name', () => {
  render(<App />);
  const nameElement = screen.getByText(/Keerthi/i);
  expect(nameElement).toBeInTheDocument();
});

