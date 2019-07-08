import { render } from '@testing-library/react';
import App from './App.js';
import React from 'react';

describe('App', () => {
  it('render page with component names', () => {
    const { getByText } = render(<App />);
    const header = getByText('E-Wall');
    expect(header).toBeVisible();
  });
});
