import React, { useState, useEffect } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const API_URL = 'https://jsonplaceholder.typicode.com/todos';

  // Charger les tâches depuis l'API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        // Limiter les tâches pour la démonstration
        setTasks(data.slice(0, 10)); // Charger seulement 10 tâches
      } catch (error) {
        console.error('Erreur lors du chargement des tâches:', error);
      }
    };

    fetchTasks();
  }, []);

  // Ajouter une nouvelle tâche via l'API
  const addTask = async () => {
    if (task.trim()) {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: task,
            completed: false,
            userId: 1, // Champs nécessaires pour l'API JSONPlaceholder
          }),
        });

        const newTask = await response.json();
        setTasks([...tasks, newTask]);
        setTask('');
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la tâche:', error);
      }
    } else {
      alert('La tâche ne peut pas être vide !');
    }
  };

  // Supprimer une tâche via l'API
  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche:', error);
    }
  };

  // Basculer l'état d'une tâche (localement pour simplifier)
  const toggleCompletion = (id) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Ma Liste de Tâches (API)</h1>
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
          disabled={!task.trim()}
          style={{
            padding: '5px 10px',
            border: 'none',
            backgroundColor: task.trim() ? '#4caf50' : '#ccc',
            color: 'white',
            cursor: task.trim() ? 'pointer' : 'not-allowed',
            borderRadius: '5px',
          }}
        >
          Ajouter
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((t) => (
          <li
            key={t.id}
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
              onClick={() => toggleCompletion(t.id)}
              style={{
                textDecoration: t.completed ? 'line-through' : 'none',
                cursor: 'pointer',
                flexGrow: 1,
              }}
            >
              {t.title}
            </span>
            <button
              onClick={() => deleteTask(t.id)}
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
    </div>
  );
};

export default App;
