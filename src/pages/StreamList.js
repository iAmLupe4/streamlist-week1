import React, { useEffect, useState } from "react"; 
import { FaCheckCircle, FaEdit, FaTrash, FaSave } from "react-icons/fa";

const STORAGE_KEY = "streamlist_item";

export default function StreamList() { 

  const [title, setTitle] = useState(""); 

  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // handleAdd
  // handleDelete
  // handleToggleComplete
  // handleEdit / handleSave

  // Add item 
  const handleAdd = (e) => { 
    e.preventDefault(); 

    const cleaned = title.trim(); 
    if (!cleaned) return; 

    const newItem = { 
      id: crypto.randomUUID(), 
      text: cleaned, 
      completed: false, 
      isEditing: false, 
    }; 

    setItems((prev) => [newItem, ...prev]); 
    setTitle(""); // ✅ clears input after submit (requirement) 
  }; 

  // Delete item 
  const handleDelete = (id) => { 
    setItems((prev) => prev.filter((item) => item.id !== id)); 
  }; 

  // Toggle complete 
  const handleToggleComplete = (id) => { 
    setItems((prev) => 
      prev.map((item) => 
        item.id === id ? { ...item, completed: !item.completed } : item 
      ) 
    ); 
  }; 

  // Start editing 
  const handleStartEdit = (id) => { 
    setItems((prev) => 
      prev.map((item) => 
        item.id === id ? { ...item, isEditing: true } : item 
      ) 
    ); 
  }; 

  // Change edit text 
  const handleEditChange = (id, value) => { 
    setItems((prev) => 
      prev.map((item) => (item.id === id ? { ...item, text: value } : item)) 
    ); 
  }; 

  // Save edit 
  const handleSaveEdit = (id) => { 
    setItems((prev) => 
      prev.map((item) => 
        item.id === id 
          ? { ...item, text: item.text.trim(), isEditing: false } 
          : item 
      ) 
    )}; 
 
  return ( 
    <div className="page"> 
      <h1 className="pageTitle">Your StreamList</h1> 
      <p className="pageSubtitle"> 
        Add a movie or show you want to watch. (Week 2: display items + edit/delete/complete) 
      </p> 

      <form onSubmit={handleAdd} className="card"> 
        <label className="label">Title</label> 
        <div className="row"> 
          <input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Ex: The Bear, Stranger Things, The Batman..." 
            className="input" 
          /> 
          <button className="btn" type="submit" disabled={!title.trim()}> 
            Add 
          </button> 
        </div> 
        <div className="hint"> 
          Tip: Actions are done using icons (complete/edit/delete). 
        </div> 
      </form> 

      <div className="card" style={{ marginTop: "14px" }}> 
        <h2 className="sectionTitle">My List</h2> 

        {items.length === 0 ? ( 
          <p className="emptyText">No titles yet — add one above.</p> 
        ) : ( 
          <ul className="list"> 
            {items.map((item) => ( 
              <li key={item.id} className={`listItem ${item.completed ? "done" : ""}`}> 
                <div className="left"> 
                  {item.isEditing ? ( 
                    <input 
                      className="editInput" 
                      value={item.text} 
                      onChange={(e) => handleEditChange(item.id, e.target.value)} 
                    /> 
                  ) : ( 
                    <span className="itemText">{item.text}</span> 
                  )} 
                </div> 

                <div className="actions"> 
                  {/* ✅ COMPLETE icon */} 
                  <button 
                    type="button" 
                    className="iconBtn" 
                    title="Complete" 
                    onClick={() => handleToggleComplete(item.id)} 
                  > 
                    <FaCheckCircle />
                  </button> 

                  {/* ✅ EDIT icon */} 
                  {!item.isEditing ? ( 
                    <button 
                      type="button" 
                      className="iconBtn" 
                      title="Edit" 
                      onClick={() => handleStartEdit(item.id)} 
                    > 
                      <FaEdit/> 
                    </button> 
                  ) : ( 
                    <button 
                      type="button" 
                      className="iconBtn" 
                      title="Save" 
                      onClick={() => handleSaveEdit(item.id)} 
                    > 
                      <FaSave /> 
                    </button> 
                  )} 

                  {/* ✅ DELETE icon */} 
                  <button 
                    type="button" 
                    className="iconBtn danger" 
                    title="Delete" 
                    onClick={() => handleDelete(item.id)} 
                  > 
                    <FaTrash /> 
                  </button> 
                </div> 
              </li> 
            ))} 
          </ul> 
        )} 
      </div> 
    </div> 
  ); 
}