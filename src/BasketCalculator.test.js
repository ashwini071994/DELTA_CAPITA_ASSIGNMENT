import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BasketCalculator from './BasketCalculator';

test('renders shopping basket calculator with correct heading', () => {
  const { getByText } = render(<BasketCalculator />);
  const headingElement = getByText(/Shopping Basket Calculator/i);
  expect(headingElement).toBeInTheDocument();
});

test('add item to basket when clicking on item button', () => {
  const { getByText, getByTestId } = render(<BasketCalculator />);
  const addButton = getByText(/Add Apple/i);
  fireEvent.click(addButton);
  const basketItems = getByTestId('basket-items');
  expect(basketItems).toHaveTextContent('Apple');
});

test('calculate total price correctly', () => {
  const { getByText, getByTestId } = render(<BasketCalculator />);
  const addButtonApple = getByText(/Add Apple/i);
  const addButtonBanana = getByText(/Add Banana/i);
  fireEvent.click(addButtonApple);
  fireEvent.click(addButtonBanana);
  const calculateButton = getByText(/Calculate Total Price/i);
  fireEvent.click(calculateButton);
  const totalPriceElement = getByTestId('total-price');
  expect(totalPriceElement).toHaveTextContent('55p');
});

test('reset basket when clicking on reset button', () => {
  const { getByText, getByTestId } = render(<BasketCalculator />);
  const addButton = getByText(/Add Apple/i);
  fireEvent.click(addButton);
  const resetButton = getByText(/Reset/i);
  fireEvent.click(resetButton);
  const basketItems = getByTestId('basket-items');
  expect(basketItems).toBeEmpty();
});
