import React, { useState, useEffect } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask('');
    } else {
      alert('La tâche ne peut pas être vide !');
    }
  };

  // Delete a task by index
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Clear all tasks
  const clearAllTasks = () => {
    setTasks([]);
  };

  // Toggle task completion
  const toggleCompletion = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Ma Liste de Tâches</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Saisissez une tâche"
          style={{
            padding: '5px',
            marginRight: '5px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />
        <button
          onClick={addTask}
          style={{
            padding: '5px 10px',
            border: 'none',
            backgroundColor: '#4caf50',
            color: 'white',
            cursor: 'pointer',
            borderRadius: '5px',
          }}
        >
          Ajouter
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((t, index) => (
          <li
            key={index}
            style={{
              textAlign: 'left',
              margin: '10px auto',
              maxWidth: '300px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: t.completed ? '#d4edda' : '#f8d7da',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          >
            <span
              onClick={() => toggleCompletion(index)}
              style={{
                textDecoration: t.completed ? 'line-through' : 'none',
                cursor: 'pointer',
                flexGrow: 1,
              }}
            >
              {t.text}
            </span>
            <button
              onClick={() => deleteTask(index)}
              style={{
                padding: '5px 10px',
                border: 'none',
                backgroundColor: '#dc3545',
                color: 'white',
                cursor: 'pointer',
                borderRadius: '5px',
                marginLeft: '10px',
              }}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
      {tasks.length > 0 && (
        <button
          onClick={clearAllTasks}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            border: 'none',
            backgroundColor: '#007bff',
            color: 'white',
            cursor: 'pointer',
            borderRadius: '5px',
          }}
        >
          Effacer Tout
        </button>
      )}
    </div>
  );
};

export default App;
