import React, { useContext } from "react"; 
import CartContext from "../context/CartContext"; 
import list from "../data/Data"; 
import "../pages/Page.css"; 

export default function Subscriptions() { 
  const { addToCart, warning } = useContext(CartContext); 

  return ( 
    <div className="page"> 
      <h1 className="pageTitle">Subscriptions</h1> 
      
      <p className="pageSubtitle"> 
        Choose one subscription. Accessories can be added multiple times. 
      </p> 

      {warning && <div className="error">{warning}</div>} 

      <div className="grid"> 
        {list.map((item) => ( 
          <div className="card" key={item.id}> 
            <div className="cardTop"> 
              <img className="thumb" src={item.img} alt={item.service} /> 
              <div> 
                <h3 className="cardTitle">{item.service}</h3> 
                <p className="muted">{item.serviceInfo}</p> 
              </div> 
            </div> 

            <div className="rowBetween"> 
              <div className="price">${item.price.toFixed(2)}</div> 

              <button className="btn" onClick={() => addToCart(item)}> 
                Add to Cart 
              </button> 
            </div> 
          </div> 
        ))} 
      </div> 
    </div> 
  ); 
} 