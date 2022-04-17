import { render } from '@testing-library/react';
import React from 'react';

import RetroCalculator from './RetroCalculator';

import '@testing-library/jest-dom';

test('renders a message', () => {
  const { getByText } = render(<RetroCalculator />);
  expect(getByText('TWO WAY POWER')).toBeInTheDocument();
});
