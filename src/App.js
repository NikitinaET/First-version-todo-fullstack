import { useState, useEffect } from 'react';
import Header from './Components/Header.jsx';
import ToDo from './Components/ToDo.jsx';
import ToDoForm from './Components/Form.jsx';
import Nav from './Components/Nav.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const url = 'http://localhost:1025/api/tasks/';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    try {
      const getTodos = async () => {
        const res = await axios.get(url);
        setTodos(res.data);
      };
      getTodos();
    }
    catch (e) {
      toast.error(e.message);
      console.log(e.nessage);
    }
  }, []);

  const addTask = async (userInput) => {
    userInput = userInput.trim();

    if (userInput) {
      const newItem = {
        task: userInput,
        complete: false,
      }
      try {
        const response = await axios.post(url, newItem);
        setTodos([...todos, response.data]);
        toast.success('Task added successfull');
      }
      catch (e) {
        toast.error(e.message);
        console.log(e.message)
      } 
    }
    else {
      // add react toastify alerts
      toast.warn('🦄 Empty text input');
    }
  }

  const removeTask = async (id) => {
    try {
      await axios.delete(url + id);
      setTodos(todos.filter(todo => todo._id !== id));
      toast.success('Task deleted',);
    }
    catch (e) {
      toast.error(e.message);
      console.log(e.message);
    }
  };

  const handleToggle = async ({_id, complete}) => {
    const isCompleted = { complete: !complete }
    try {
      await axios.put(url + _id, isCompleted);
      setTodos([...todos.map(todo => todo._id === _id ? { ...todo, complete: !todo.complete } : todo)]);
    }
    catch (e) {
      toast.error(e.message);
      console.log(e.message);
    }
  }

  const removeCompleted = async () => {
    try {
      await axios.delete(url);
      setTodos(todos.filter(todo => !todo.complete));
    }
    catch (e) {
      toast.error(e.message);
      console.log(e.message);
    }
  }

  const setCompleteAll = async (completed) => {
    try {
      await axios.put(url, {completed});
      setTodos(todos.map(todo => ({ ...todo, complete: completed })));
    }
    catch (e) {
      toast.error(e.message);
      console.log(e.message);
    }
  }

  const activeLength = todos.filter(todo => !todo.complete).length;
  const totalLength = todos.length;

  return (
    <div className="App">
      <Header />
      <div className="shadow">
        <ToDoForm
          addTask={addTask}
          totalLength={totalLength}
          toggleTodos={setCompleteAll}
          allCompleted={!activeLength}
        />
        {todos.filter((todo) =>
          (filter === 'All') ||
          (filter === 'Active' && !todo.complete) ||
          (filter === 'Completed' && todo.complete)
        ).map(todo => {
          return (
            <ToDo
              todo={todo}
              key={todo._id}
              toggleTask={() => {handleToggle(todo)}}
              removeTask={() => {removeTask(todo._id)}}
              changeTask={addTask}
            />
          )
        })}
        <Nav
          itemsLeft={activeLength}
          removeCompleted={removeCompleted}
          toggleFilter={setFilter}
          items={totalLength}
        />
        <ToastContainer
        hideProgressBar={false}
        autoClose={2000}
        />
      </div>
    </div>
  )
}

export default App;
