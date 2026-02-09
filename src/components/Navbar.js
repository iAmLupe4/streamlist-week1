import React, { useContext } from "react"; 
import { NavLink } from "react-router-dom"; 
import { FaListCheck, FaFilm, FaCartShopping, FaCircleInfo } from "react-icons/fa6"; 
import CartContext from "../context/CartContext"; 
import "./Navbar.css"; 

export default function Navbar() { 
  const { cartCount } = useContext(CartContext); 

  return ( 
    <header className="navHeader"> 
      <div className="brand"> 
        <span className="brandLogo">EZ</span> 
        <div className="brandText"> 
          <div className="brandTitle">StreamList</div> 
          <div className="brandSub">EZTechMovie • Cloud Streaming Lists</div> 
        </div> 
      </div> 

      <nav className="navLinks"> 
        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}> 
          <FaListCheck /> StreamList 
        </NavLink> 

        <NavLink to="/movies" className={({ isActive }) => (isActive ? "active" : "")}> 
          <FaFilm /> Movies 
        </NavLink> 

        <NavLink to="/cart" className={({ isActive }) => (isActive ? "active" : "")}> 
          <FaCartShopping /> Cart ({cartCount}) 
        </NavLink> 

        <NavLink to="/subscriptions" className={({ isActive }) => (isActive ? "active" : "")}>
        Subscriptions
        </NavLink>

        <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}> 
          <FaCircleInfo /> About 
        </NavLink>
      </nav>
    </header> 
    
  ); 
} 