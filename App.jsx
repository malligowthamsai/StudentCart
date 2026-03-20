import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/products")
      .then(res => setProducts(res.data))
      .catch(() => {
        // fallback dummy data if backend not ready
        setProducts([
          { _id: 1, name: "Notebook", price: 50 },
          { _id: 2, name: "Pen Pack", price: 20 },
          { _id: 3, name: "Backpack", price: 500 }
        ]);
      });
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      
      <h1>🎓 StudentCart</h1>

      <h2>Products</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {products.map((p) => (
          <div key={p._id} style={{
            border: "1px solid #ccc",
            padding: "10px",
            width: "150px"
          }}>
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <button onClick={() => addToCart(p)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: "40px" }}>🛒 Cart</h2>
      {cart.length === 0 ? (
        <p>No items yet</p>
      ) : (
        cart.map((item, index) => (
          <p key={index}>
            {item.name} - ₹{item.price}
          </p>
        ))
      )}

    </div>
  );
}
