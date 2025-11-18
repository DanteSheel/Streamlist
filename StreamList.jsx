import React, { useState } from "react";
import "./StreamList.css";

export default function StreamList() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  
  function handleAdd(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const newItem = {
      id: Date.now(),
      text: input.trim(),
      completed: false
    };

    setItems([newItem, ...items]);
    console.log("Added:", newItem);
    setInput(""); 
  }

  
  function handleDelete(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  
  function handleComplete(id) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  
  function handleEdit(id, text) {
    setEditId(id);
    setEditText(text);
  }

  
  function saveEdit(id) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, text: editText } : item
      )
    );
    setEditId(null);
    setEditText("");
  }

  return (
    <section className="stream">
      <h2>Your StreamList</h2>

      <form className="inputRow" onSubmit={handleAdd}>
        <input
          placeholder="Add a movie or show..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="btn">Add</button>
      </form>

      <ul className="list">
        {items.length === 0 && (
          <li className="empty">No items yet — start adding!</li>
        )}

        {items.map((item) => (
          <li key={item.id} className={`item ${item.completed ? "done" : ""}`}>
            
            {/* If editing mode */}
            {editId === item.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="editInput"
                />
                <button className="iconBtn" onClick={() => saveEdit(item.id)}>
                  <span className="material-icons">save</span>
                </button>
              </>
            ) : (
              <>
                <span className="text">{item.text}</span>

                <div className="actions">
                  <button
                    className="iconBtn"
                    onClick={() => handleComplete(item.id)}
                  >
                    <span className="material-icons">
                      {item.completed ? "undo" : "check_circle"}
                    </span>
                  </button>

                  <button
                    className="iconBtn"
                    onClick={() => handleEdit(item.id, item.text)}
                  >
                    <span className="material-icons">edit</span>
                  </button>

                  <button
                    className="iconBtn"
                    onClick={() => handleDelete(item.id)}
                  >
                    <span className="material-icons">delete</span>
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

