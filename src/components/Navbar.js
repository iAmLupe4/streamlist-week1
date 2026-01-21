import React from "react"; 
import { NavLink } from "react-router-dom"; 
import { FaList, FaFilm, FaShoppingCart, FaInfoCircle } from "react-icons/fa"; 
import "./Navbar.css"; 

export default function Navbar() { 
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
          <FaList /> StreamList 
        </NavLink> 
        <NavLink to="/movies" className={({ isActive }) => (isActive ? "active" : "")}> 
          <FaFilm /> Movies 
        </NavLink> 
        <NavLink to="/cart" className={({ isActive }) => (isActive ? "active" : "")}> 
          <FaShoppingCart /> Cart 
        </NavLink> 
        <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}> 
          <FaInfoCircle /> About 
        </NavLink> 
      </nav> 
    </header> 
  ); 
} 