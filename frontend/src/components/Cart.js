import React, { useEffect } from 'react';

function Cart({ cart, removeFromCart, updateQuantity }) {
  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Define a memoized callback for updating the cart data in localStorage
  const updateCartInLocalStorage = (updatedCart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  useEffect(() => {
    // Load the cart data from localStorage when the component mounts
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

    // Update the cart with the stored data
    updateQuantity(storedCart);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleIncrement = (productId) => {
    // Find the cart item by productId
    const cartItem = cart.find((item) => item.product.id === productId);
    if (cartItem) {
      // Update the quantity by 1
      updateQuantity(productId, cartItem.quantity + 1);

      // Update localStorage with the new cart data
      updateCartInLocalStorage(cart);
    }
  };

  const handleDecrement = (productId) => {
    // Find the cart item by productId
    const cartItem = cart.find((item) => item.product.id === productId);
    if (cartItem && cartItem.quantity > 1) {
      // Update the quantity by -1
      updateQuantity(productId, cartItem.quantity - 1);

      // Update localStorage with the new cart data
      updateCartInLocalStorage(cart);
    }
  };

  return (
    <div className="cart">
      <h1 className={`cart-title ${cart.length > 0 ? 'glow' : ''}`}>Shopping Cart</h1>
      <div className="cart-content">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div key={item.product.id} className="cart-item">
                <div className="cart-item-info">
                  <img src={item.product.image} alt={item.product.title} />
                  <h3>{item.product.title}</h3>
                  <p>Price: ${item.product.price.toFixed(2)}</p>
                  <p className="prod-quantity">
                    Quantity: {item.quantity}{' '}
                    <button onClick={() => handleDecrement(item.product.id)}>-</button>
                    <button onClick={() => handleIncrement(item.product.id)}>+</button>
                  </p>
                </div>
                <button onClick={() => removeFromCart(item.product.id)}>Remove</button>
              </div>
            ))}
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
