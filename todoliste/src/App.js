import React, { useState } from 'react';
import './App.css';


function App() {
    const [isComplete, setIsComplete] = useState(false);
  return (
    <div className="App">
       <h1>My TodoList</h1>
       <div className="todo-wrapper">
         <div className="todo-input">
            <div className="todo-input-item">
                <label >Title</label>
                <input type="text" placeholder='Whats the task title?' />
            </div>
            <div className="todo-input-item">
                <label>Description</label>
                <input type="text" placeholder='Whats the task description?' />
            </div>
            <div className="todo-input-item">
                <button type='button' className='primaryBtn'>Add</button>
            </div>
         </div>
         <div className="btn-area">
             <button 
                className={"secondaryBtn ${isComplete===false && 'active'}"} 
                onClick={()=>setIsComplete(false)}>
                  Todo
              </button>
             <button className={"secondaryBtn ${isComplete===false && 'active'}"}
              onClick={()=>setIsComplete(true)}>
                Completed
             </button>
             
         </div>
         <div className="todo-list">
             <div className="todo-list-item">
                <h3>Task 1</h3>
                <p>Description</p>
             </div>
         </div>
       </div>
    </div>
  );
}

export default App;
