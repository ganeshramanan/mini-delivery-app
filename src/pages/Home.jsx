import { useContext } from "react";
import { products } from "../data/products";
import { CartContext } from "../context/CartContext";

export default function Home() {
  const { cart, addToCart, removeFromCart, clearCart } =
    useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="container">
      <h1 className="title">Products</h1>

      <div className="product-grid">
        {products.map((p) => (
          <div key={p.id} className="card">
            <img src={p.image} alt={p.name} className="product-image" />

            <h2>{p.name}</h2>

            <p className="price">₹{p.price}</p>

            <button className="btn" onClick={() => addToCart(p)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="cart-section">
        <h2>🛒 Cart ({cart.length})</h2>

        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                  {item.name} × {item.qty}
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}

            <h3>Total: ₹{total}</h3>

            <button className="clear-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
}
