import React, { useState } from "react"; 
import "./Page.css"; 

export default function StreamList() { 
  const [title, setTitle] = useState(""); 

  function handleSubmit(e) { 
    e.preventDefault(); 

    const trimmed = title.trim(); 
    if (!trimmed) return; 

    // REQUIRED: display user's input on the console 
    console.log("StreamList item submitted:", trimmed); 

    setTitle("");
  } 

  return ( 
    <section className="page"> 
      <h1 className="pageTitle">Your StreamList</h1> 
      <p className="pageSubtitle"> 
        Add a movie or show you want to watch. (Week 1 requirement: input logs to console.) 
      </p> 
      <form className="card formRow" onSubmit={handleSubmit}> 
        <label className="label"> 
          Title 
          <input
            className="input" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Ex: The Bear, Stranger Things, The Batman..." 
            aria-label="StreamList item title" 
          /> 
        </label> 

        <button className="btn" type="submit"> 
          Add 
        </button> 
      </form> 

      <div className="hint"> 
        <strong>Tip:</strong> Open DevTools → <em>Console</em> to see your submitted titles. 
      </div> 
    </section> 
  );
} 