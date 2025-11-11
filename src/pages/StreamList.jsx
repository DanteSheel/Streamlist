import React, { useState } from 'react';
import './StreamList.css';

export default function StreamList(){
  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);

  function handleAdd(e){
    e.preventDefault();
    if(!input.trim()) return;
    const newItem = { id: Date.now(), text: input.trim() };
    setItems(prev => [newItem, ...prev]);
    console.log('StreamList added item:', newItem); // <-- requirement: display input on console
    setInput('');
  }

  function handleRemove(id){
    setItems(prev => prev.filter(i=>i.id !== id));
  }

  return (
    <section className='stream'>
      <h2>Your StreamList</h2>
      <form className='inputRow' onSubmit={handleAdd}>
        <input
          placeholder='Add a movie or show title...'
          value={input}
          onChange={e=>setInput(e.target.value)}
        />
        <button type='submit' className='btn'>Add</button>
      </form>

      <div className='instructions'>
        Please place your movie or show title above.
      </div>

      <ul className='list'>
        {items.length === 0 && <li className='empty'>No items yet — add something!</li>}
        {items.map(item=>(
          <li key={item.id} className='item'>
            <span>{item.text}</span>
            <button onClick={()=>handleRemove(item.id)} aria-label="remove">Remove</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
