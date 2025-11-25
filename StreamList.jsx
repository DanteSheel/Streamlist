import React, { useState, useEffect } from 'react';
import './StreamList.css';

export default function StreamList() {
  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('streamItems');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved items', e);
      }
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('streamItems', JSON.stringify(items));
  }, [items]);

  function handleAdd(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const newItem = {
      id: Date.now(),
      text: input.trim(),
      completed: false
    };
    setItems(prev => [newItem, ...prev]);
    console.log('User added item:', newItem);
    setInput('');
  }

  function handleDelete(id) {
    setItems(prev => prev.filter(item => item.id !== id));
  }

  function handleComplete(id) {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  function handleEditStart(id, text) {
    setEditId(id);
    setEditText(text);
  }

  function handleEditSave(id) {
    if (!editText.trim()) return;
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, text: editText.trim() } : item
      )
    );
    setEditId(null);
    setEditText('');
  }

  function handleEditCancel() {
    setEditId(null);
    setEditText('');
  }

  return (
    <section className="stream">
      <h2>Your StreamList</h2>
      <p className="subtitle">
        Add movies or shows you want to watch. Your list is saved automatically on this device.
      </p>

      <form className="inputRow" onSubmit={handleAdd}>
        <input
          placeholder="Add a movie or show..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit" className="btn">
          <span className="material-icons">add</span>
          Add
        </button>
      </form>

      <ul className="list">
        {items.length === 0 && (
          <li className="empty">No items yet — start building your StreamList!</li>
        )}

        {items.map(item => (
          <li key={item.id} className={`item ${item.completed ? 'done' : ''}`}>
            {editId === item.id ? (
              <>
                <input
                  className="editInput"
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                />
                <div className="actions">
                  <button
                    type="button"
                    className="iconBtn"
                    onClick={() => handleEditSave(item.id)}
                    title="Save"
                  >
                    <span className="material-icons">save</span>
                  </button>
                  <button
                    type="button"
                    className="iconBtn"
                    onClick={handleEditCancel}
                    title="Cancel"
                  >
                    <span className="material-icons">close</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="text">{item.text}</span>
                <div className="actions">
                  <button
                    type="button"
                    className="iconBtn"
                    onClick={() => handleComplete(item.id)}
                    title={item.completed ? 'Mark as not completed' : 'Mark as completed'}
                  >
                    <span className="material-icons">
                      {item.completed ? 'undo' : 'check_circle'}
                    </span>
                  </button>
                  <button
                    type="button"
                    className="iconBtn"
                    onClick={() => handleEditStart(item.id, item.text)}
                    title="Edit"
                  >
                    <span className="material-icons">edit</span>
                  </button>
                  <button
                    type="button"
                    className="iconBtn"
                    onClick={() => handleDelete(item.id)}
                    title="Delete"
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
