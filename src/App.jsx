// src/App.jsx

import { useEffect, useState } from "react";
import { products } from "./data/products";
import "./App.css";

function App() {
  // Search

  const [search, setSearch] = useState("");

  // Persist Category

  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem("selectedCategory") || "all";
  });

  // Persist Cart

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Persist Customer Name

  const [customerName, setCustomerName] = useState(() => {
    return localStorage.getItem("customerName") || "";
  });

  // Persist Phone

  const [phone, setPhone] = useState(() => {
    return localStorage.getItem("phone") || "";
  });

  // Persist Address

  const [address, setAddress] = useState(() => {
    return localStorage.getItem("address") || "";
  });

  // Save Cart

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Save Category

  useEffect(() => {
    localStorage.setItem("selectedCategory", selectedCategory);
  }, [selectedCategory]);

  // Save Customer Name

  useEffect(() => {
    localStorage.setItem("customerName", customerName);
  }, [customerName]);

  // Save Phone

  useEffect(() => {
    localStorage.setItem("phone", phone);
  }, [phone]);

  // Save Address

  useEffect(() => {
    localStorage.setItem("address", address);
  }, [address]);

  // Add To Cart

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      );

      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  // Increase Quantity

  const increaseQty = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item,
    );

    setCart(updatedCart);
  };

  // Decrease Quantity

  const decreaseQty = (productId) => {
    const updatedCart = cart
      .map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item,
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
  };

  // Clear Cart

  const clearCart = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear the cart?",
    );

    if (confirmClear) {
      setCart([]);

      localStorage.removeItem("cart");
    }
  };

  // Product Filtering

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ? true : product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Totals

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // WhatsApp Order

  const placeOrder = () => {
    if (!customerName || !phone || !address) {
      alert("Please fill all details");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    // Order Items

    const orderItems = cart
      .map(
        (item) =>
          `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`,
      )
      .join("\n");

    // WhatsApp Message

    const message = `🛒 New Order

Customer Name: ${customerName}

Phone: ${phone}

Address:
${address}

------------------------

${orderItems}

------------------------

Total Amount: ₹${totalAmount}

Thank you 🚚`;

    // Replace With Your Number

    const whatsappNumber = "919999999999";

    // WhatsApp URL

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappURL, "_blank");
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Categories */}

      <div className="categories">
        <button onClick={() => setSelectedCategory("all")}>All</button>

        <button onClick={() => setSelectedCategory("milk")}>Milk</button>

        <button onClick={() => setSelectedCategory("fruits")}>Fruits</button>

        <button onClick={() => setSelectedCategory("vegetables")}>
          Vegetables
        </button>

        <button onClick={() => setSelectedCategory("snacks")}>Snacks</button>

        <button onClick={() => setSelectedCategory("rice")}>Rice</button>
      </div>

      {/* Products */}

      <div className="products-grid">
        {filteredProducts.map((product) => {
          const cartItem = cart.find((item) => item.id === product.id);

          return (
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

              {!cartItem ? (
                <button className="add-btn" onClick={() => addToCart(product)}>
                  Add
                </button>
              ) : (
                <div className="qty-controls">
                  <button
                    className="qty-btn"
                    onClick={() => decreaseQty(product.id)}
                  >
                    -
                  </button>

                  <span>{cartItem.quantity}</span>

                  <button
                    className="qty-btn"
                    onClick={() => increaseQty(product.id)}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Cart */}

      <div className="cart-container">
        <h2>🛒 Cart Summary ({totalItems} items)</h2>

        {/* Clear Cart Button */}

        {cart.length > 0 && (
          <button className="clear-cart-btn" onClick={clearCart}>
            Clear Cart
          </button>
        )}

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-left">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-image"
                  />

                  <div>
                    <h4>{item.name}</h4>

                    <p>
                      ₹{item.price} × {item.quantity}
                    </p>

                    <strong>₹{item.price * item.quantity}</strong>
                  </div>
                </div>

                <div className="qty-controls">
                  <button
                    className="qty-btn"
                    onClick={() => decreaseQty(item.id)}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    className="qty-btn"
                    onClick={() => increaseQty(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-total">
              <h2>Total Amount: ₹{totalAmount}</h2>
            </div>
          </>
        )}
      </div>

      {/* Checkout */}

      <div className="checkout-container">
        <h2>📦 Checkout</h2>

        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="checkout-input"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="checkout-input"
        />

        <textarea
          placeholder="Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="checkout-textarea"
        />

        <button className="place-order-btn" onClick={placeOrder}>
          Place Order on WhatsApp
        </button>
      </div>
    </div>
  );
}

export default App;
