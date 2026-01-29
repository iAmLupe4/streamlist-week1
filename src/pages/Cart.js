import React, { useContext } from "react"; 
import CartContext from "../context/CartContext"; 
import "../pages/Page.css"; 

export default function Cart() { 
  const { cartItems, totalPrice, removeFromCart, updateQty, clearCart } = 
    useContext(CartContext); 

  return ( 
    <div className="page"> 
      <h1 className="pageTitle">Cart</h1> 
      <p className="pageSubtitle">Review items, update quantities, and checkout total.</p> 

      {cartItems.length === 0 ? ( 
        <div className="card">Your cart is empty.</div> 
      ) : ( 
        <> 
          <div className="card"> 
            {cartItems.map((item) => ( 
              <div className="cartRow" key={item.id}> 
                <div className="cartLeft"> 
                  <img className="thumbSmall" src={item.img} alt={item.service} /> 
                  <div> 
                    <div className="cartName">{item.service}</div> 
                    <div className="muted">${item.price.toFixed(2)} each</div> 
                  </div> 
                </div> 

                <div className="cartRight"> 
                  <input 
                    className="qty" 
                    type="number" 
                    min="1" 
                    value={item.qty || 1} 
                    onChange={(e) => updateQty(item.id, e.target.value)} 
                  /> 

                  <div className="lineTotal"> 
                    ${(item.price * (item.qty || 1)).toFixed(2)} 
                  </div> 

                  <button className="btnDanger" onClick={() => removeFromCart(item.id)}> 
                    Remove 
                  </button> 
                </div> 
              </div> 
            ))} 
          </div> 

          <div className="card rowBetween"> 
            <strong>Total:</strong> 
            <strong>${totalPrice.toFixed(2)}</strong> 
          </div> 

          <div className="rowEnd"> 
            <button className="btnOutline" onClick={clearCart}> 
              Clear Cart 
            </button> 
          </div> 
        </> 
      )} 
    </div> 
  ); 
} 