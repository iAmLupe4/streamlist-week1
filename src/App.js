 import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Navbar from "./components/Navbar"; 
import StreamList from "./pages/StreamList"; 
import Movies from "./pages/Movies"; 
import Cart from "./pages/Cart"; 
import About from "./pages/About"; 
import Subscriptions from "./pages/Subscriptions";

function App() { 
  return ( 
    <Router> 
      <Navbar /> 
      <main style={{ color: "white", padding: "1.5rem" }}> 
        <Routes> 
          <Route path="/" element={<StreamList />} /> 
          <Route path="/movies" element={<Movies />} /> 
          <Route path="/cart" element={<Cart />} /> 
          <Route path="/about" element={<About />} /> 
          <Route path="/subscriptions" element={<Subscriptions />} />
        </Routes> 
      </main> 
    </Router> 
  ); 
} 
 
export default App; 