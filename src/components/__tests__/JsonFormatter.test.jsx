import { render, screen } from '@testing-library/react';
import JsonFormatter from '../JsonFormatter.jsx';

test('renders JSON Formatter heading', () => {
  render(<JsonFormatter />);
  expect(screen.getByText(/JSON Formatter/i)).toBeInTheDocument();
});
