import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [currentTask, setCurrentTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, id: Date.now() }]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id) => {
    setIsEditing(id);
    const task = tasks.find(task => task.id === id);
    setCurrentTask(task.text);
  };

  const saveTask = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, text: currentTask } : task)));
    setIsEditing(null);
    setCurrentTask('');
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {isEditing === task.id ? (
              <div>
                <input
                  type="text"
                  value={currentTask}
                  onChange={(e) => setCurrentTask(e.target.value)}
                />
                <button className="save" onClick={() => saveTask(task.id)}>Save</button>
              </div>
            ) : (
              <div>
                <span>{task.text}</span>
                <button className="edit" onClick={() => editTask(task.id)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="delete" onClick={() => deleteTask(task.id)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
