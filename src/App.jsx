import { useState } from "react";
import { products } from "./data/products";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>Mini Delivery App 🚚</h1>
      </header>

      {/* Search */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          className="search-box"
        />
      </div>

      {/* Categories */}
      <div className="categories">
        <button>Milk</button>
        <button>Fruits</button>
        <button>Vegetables</button>
        <button>Snacks</button>
        <button>Rice</button>
      </div>

      {/* Product Grid */}
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />

            <div className="product-info">
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
            </div>

            <button className="add-btn" onClick={() => addToCart(product)}>
              Add
            </button>
          </div>
        ))}
      </div>

      {/* Floating Cart */}
      <div className="floating-cart">🛒 {cart.length} items</div>
    </div>
  );
}

export default App;
