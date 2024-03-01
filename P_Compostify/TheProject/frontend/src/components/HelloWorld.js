import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ThemeProvider, createTheme } from '@mui/material/styles';



function HelloWorld() {
  const [message, setMessage] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const createTask = async (taskData) => {
    setIsLoading(true);
    try {
        const response = await axios.post('http://127.0.0.1:8000/create-task/', taskData);
        if (response.status === 200) {
            const newTask = response.data;
            setTasks([...tasks, newTask]);
            setMessage('Task created successfully!');
        } else {
            console.error('Request failed:', response.status);
            setMessage('Failed to create task. Please try again.');
        }
    } catch (error) {
        console.error('Error creating task:', error);
        setMessage('An error occurred while creating the task.');
    } finally {
        setIsLoading(false);
    }
};


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});


  const [theme] = useState(
    Cookies.get('theme') === 'dark' ? darkTheme : lightTheme
  );

const fetchTasks = async () => {
  setIsLoading(true);
  try {
    const response = await axios.get('http://127.0.0.1:8000/hello-world/');
    setTasks(response.data);
    setMessage(response.data.message); 
  } catch (error) {
    console.error('Error fetching tasks:', error);
    setMessage('Failed to fetch tasks.'); 
  } finally {
    setIsLoading(false);
  }
};


  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskCreation = (event) => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const description = event.target.elements.description.value;
    createTask({ title, description });
  };

  const handleTaskDeletion = async (taskId) => {
    setIsLoading(true);
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/delete-task/${taskId}/`);
        if (response.status === 204) {
            setTasks(tasks.filter(task => task.id !== taskId));
            setMessage('Task deleted successfully!');
        } else {
            console.error('Request failed:', response.status);
            setMessage('Failed to delete task. Please try again.');
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        setMessage('An error occurred while deleting the task.');
    } finally {
        setIsLoading(false);
    }
};

  return (
    <ThemeProvider theme={theme}>
    <main>
      <header>
        <h1>Hello, World!</h1>
        <p>{message}</p>
      </header>
      <section>
        <form onSubmit={handleTaskCreation}>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" required />
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" required />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Task'}
          </button>
        </form>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <span>{task.title}</span>
              <button onClick={() => handleTaskDeletion(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
      <footer>
        <p>Footer content goes here</p>
      </footer>
    </main>
    </ThemeProvider>
  );
}

export default HelloWorld;