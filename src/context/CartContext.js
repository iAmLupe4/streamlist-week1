import React, { createContext, useEffect, useMemo, useState } from "react"; 

const CartContext = createContext(); 

const STORAGE_KEY = "eztech_cart_v1"; 

// Helper: identify subscription vs accessory 
const isSubscription = (item) => 
  item?.category === "subscription" || 
  (typeof item?.service === "string" && item.service.toLowerCase().includes("subscription")); 

export function CartProvider({ children }) { 
  // Load once 
  const [cartItems, setCartItems] = useState(() => { 
    try { 
      const saved = localStorage.getItem(STORAGE_KEY); 
      return saved ? JSON.parse(saved) : []; 
    } catch { 
      return []; 
    } 
  }); 

  const [warning, setWarning] = useState(""); 

  // Save every time cart changes 
  useEffect(() => { 
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems)); 
  }, [cartItems]); 

  // Count badge 
  const cartCount = useMemo(() => { 
    return cartItems.reduce((sum, item) => sum + (item.qty || 1), 0); 
  }, [cartItems]); 

  // Total price 
  const totalPrice = useMemo(() => { 
    return cartItems.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0); 
  }, [cartItems]); 

  // Add item with subscription rule 
  const addToCart = (item) => { 
    setWarning(""); 

    setCartItems((prev) => { 
      const alreadyHasSubscription = prev.some((x) => isSubscription(x)); 
      const addingSubscription = isSubscription(item); 

      // Rule: only one subscription allowed 
      if (addingSubscription && alreadyHasSubscription) { 
        setWarning("Only one subscription can be added at a time."); 
        return prev; 
      } 

      // Accessories can be added multiple times (increase qty if already in cart) 
      const existing = prev.find((x) => x.id === item.id); 

      if (existing) { 
        return prev.map((x) => 
          x.id === item.id ? { ...x, qty: (x.qty || 1) + 1 } : x 
        ); 
      } 

      return [...prev, { ...item, qty: 1 }]; 
    }); 
  }; 

  const removeFromCart = (id) => { 
    setWarning(""); 
    setCartItems((prev) => prev.filter((x) => x.id !== id)); 
  }; 

  const updateQty = (id, qty) => { 
    setWarning(""); 
    const cleanQty = Number(qty); 

    setCartItems((prev) => 
      prev.map((x) => 
        x.id === id ? { ...x, qty: cleanQty < 1 ? 1 : cleanQty } : x 
      ) 
    ); 
  }; 

  const clearCart = () => { 
    setWarning(""); 
    setCartItems([]); 
  }; 

  const value = { 
    cartItems, 
    cartCount, 
    totalPrice, 
    warning, 
    addToCart, 
    removeFromCart, 
    updateQty, 
    clearCart, 
  }; 

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>; 
} 

export default CartContext;