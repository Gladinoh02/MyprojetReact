import React, { useState, useEffect } from 'react';
import './App.css';
import {AiOutlineDelete} from 'react-icons/ai';
import { BsCheckLg } from "react-icons/bs";
function App() {
    const [isComplete, setIsComplete] = useState(false);
    const [allTodos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [completedTodos, setCompletedTodos] = useState([]);
    const handleAddTodo = ()=>{
      let newTodoItem = {
        title: newTitle,
        description:newDescription
      }
      let updateTodoArr = [...allTodos];
      updateTodoArr.push (newTodoItem);
      setTodos(updateTodoArr);
      localStorage.setItem('todolist', JSON.stringify(updateTodoArr))
      
    };
    const handleDeleteTodo = (index)=>{
      let reducedTodo = [...allTodos];
      reducedTodo.splice(index, 1);

      localStorage.setItem('todolist', JSON.stringify(reducedTodo));
      setTodos(reducedTodo);
    }

    const handleCompletdDeleteTodo = (index)=>{
      let reducedTodo = [...completedTodos];
      reducedTodo.splice(index, 1);

      localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
      setCompletedTodos(reducedTodo);
    }

    const handleComplete =  (index)=>{
      let now = new Date();
      let dd = now.getDate();
      let mm = now.getMonth() + 1;
      let yyyy = now.getFullYear();
      let h = now.getHours();
      let m = now.getMinutes();
      let s = now.getSeconds();
      let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' +m+ ':' + s;
      let filtereditem = {
        ...allTodos[index],
        completedOn:completedOn
      }

      let updatedCompletedArr = [...completedTodos];
      updatedCompletedArr.push(filtereditem);
      setCompletedTodos(updatedCompletedArr);
      handleDeleteTodo(index);
      localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr))

    };
    useEffect(()=>{
       let savedTodo = JSON.parse(localStorage.getItem('todolist'));
       let savedTCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'))
        if (savedTodo) {
          setTodos(savedTodo);
        }
        if (savedTCompletedTodo) {
          setCompletedTodos(savedTCompletedTodo);
        }
      }, [])
  return (
    <div className="App">
       <h1>My TodoList</h1>
       <div className="todo-wrapper">
         <div className="todo-input">
            <div className="todo-input-item">
                <label >Title</label>
                <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)}  placeholder='Whats the task title?' />
            </div>
            <div className="todo-input-item">
                <label>Description</label>
                <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)}  placeholder='Whats the task description?' />
            </div>
            <div className="todo-input-item">
                <button type='button' onClick ={handleAddTodo} className='primaryBtn'>Add</button>
            </div>
         </div>
         <div className="btn-area">
             <button 
                className={'secondaryBtn ${isComplete === false && active}'}
                onClick={()=>setIsComplete(false)}>
                  Todo
              </button>
             <button className={"secondaryBtn ${isComplete===false && 'active'}"}
              onClick={()=>setIsComplete(true)}>
                Completed
             </button>
             
         </div>
         <div className="todo-list">
             {isComplete ===false && allTodos.map((item, index)=>{
              return(
                <div className="todo-list-item" key={index}>
                <div>
                   <h3>{item.title}</h3>
                   <p>{item.description}</p>
                </div>
                <div>
                  <AiOutlineDelete  className='icon' onClick={()=>handleDeleteTodo(index)}/>
                  <BsCheckLg className='check-icon' onClick={()=>handleComplete(index)}/>
                </div>
            </div>
              )
             })}

            {isComplete ===true && completedTodos.map((item, index)=>{
              return(
                <div className="todo-list-item" key={index}>
                <div>
                   <h3>{item.title}</h3>
                   <p>{item.description}</p>
                   <p><small>Completed on: {item.completedOn}</small></p>
                </div>
                <div>
                  <AiOutlineDelete  className='icon' onClick={()=>handleCompletdDeleteTodo(index)}/>
                  
                </div>
            </div>
              )
             })}
         </div>
       </div>
    </div>
  );
}

export default App;
