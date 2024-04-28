import React, { useState } from 'react';
import './BasketCalculator.css'; // Import CSS file for styling

const BasketCalculator = () => {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleAddItem = (itemName) => {
    setItems([...items, itemName]);
  };

  const handleReset = () => {
    setItems([]);
    setTotalPrice(0);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    const itemCounts = items.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});

    Object.keys(itemCounts).forEach((itemName) => {
      const count = itemCounts[itemName];
      switch (itemName) {
        case 'Apple':
          totalPrice += count * 35;
          break;
        case 'Banana':
          totalPrice += count * 20;
          break;
        case 'Melon':
          totalPrice += Math.ceil(count / 2) * 50; // buy one get one free
          break;
        case 'Lime':
          totalPrice += Math.floor(count / 3) * 2 * 15 + (count % 3) * 15; // three for the price of two
          break;
        default:
          console.log(`Unknown item: ${itemName}`);
      }
    });

    setTotalPrice(totalPrice);
  };

  return (
    <div className="basket-container">
      <h1>Shopping Basket Calculator</h1>
      <div className="button-container">
        <button className="item-button" onClick={() => handleAddItem('Apple')}>Add Apple</button>
        <button className="item-button" onClick={() => handleAddItem('Banana')}>Add Banana</button>
        <button className="item-button" onClick={() => handleAddItem('Melon')}>Add Melon</button>
        <button className="item-button" onClick={() => handleAddItem('Lime')}>Add Lime</button>
      </div>
      <div className="basket-items">
        <h2>Items in Basket:</h2>
        <ul data-testid="basket-items">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <button className="calculate-button" onClick={calculateTotalPrice}>Calculate Total Price</button>
        <button className="reset-button" onClick={handleReset}>Reset</button>
      </div>
      <div className="total-price" data-testid="total-price">
        <h2>Total Price: {totalPrice}p</h2>
      </div>
    </div>
  );
};

export default BasketCalculator;
