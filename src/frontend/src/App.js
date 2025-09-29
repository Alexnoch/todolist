import React, { useState, useEffect } from 'react';
import { TodoTitle } from './todoTitle';
import { TodoItem } from './todoItem';
import { Options } from './options';

import './index.css';

function App() {

  const [todos, setTodos] = useState([]);

  const fetchData = async (url, methood, body) => {
    try {
      const response = await fetch(url, {
        method: methood,
        headers: {'Content-Type': 'application/json'},
        body: body ? JSON.stringify(body) : ''
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setTodos(result.data)
    } catch (error) {
      setTodos('Err');
    }
  }

  const addNewTodo = (newTodo) => fetchData('http://127.0.0.1:3001/todos', 'POST', { id: 1, title: newTodo });
  const deleteTodo = (deleteId) => fetchData(`http://127.0.0.1:3001/todos/${deleteId}`, 'DELETE', false);
  const updateTodo = (todo, done) => fetchData(`http://127.0.0.1:3001/todos`, 'PATCH', { ...todo, done });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3001/todos');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setTodos(result.data);
      } catch (err) {
        setTodos('Err');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <div className="todo">
        <TodoTitle />
        {todos?.map((todo) => (<TodoItem key={todo.id + todo.title} id={todo.id} title={todo.title} deleteTodo={deleteTodo} done={todo?.done} changeTodoDone={updateTodo}/>))}
        <Options addNewTodo={addNewTodo} />
      </div>

    </div>

  );
}

export default App;


    // const fetchData = async () => {
    //   try {
    //     const response = await fetch('http://127.0.0.1:3001/todos', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ id: 1, title: newTodo }),
    //     });

    //     if (!response.ok) {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }
    //     const result = await response.json();
    //     setTodos(result.data)
    //   } catch (err) {
    //     setTodos('Err');
    //   }
    // };
    // fetchData();


        // const fetchData = async () => {
    //   try {
    //     const response = await fetch(`http://127.0.0.1:3001/todos/${deleteId}`, {
    //       method: 'DELETE',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     });

    //     if (!response.ok) {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }
    //     const result = await response.json();
    //     setTodos(result.data)
    //   } catch (err) {
    //     setTodos('Err');
    //   }
    // };
    // fetchData();