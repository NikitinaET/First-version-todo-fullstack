import Header from './Components/Header.jsx';
import ToDo from './Components/ToDo.jsx';
import ToDoForm from './Components/Form.jsx';
import Nav from './Components/Nav.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadTodo, addTodo, deleteTodo, deleteCompleted, setComplAll,  toggleTodo } from './store/actions.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const url = 'http://localhost:1025/api/tasks/';

function NewApp() {

  const [filter, setFilter] = useState('All');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodo()); 
  }, []);

  const tasks = useSelector(state => state.items);

  const addTask = (userInput) => {
   userInput = userInput.trim();
    if (userInput) {
      const newItem = {
        task: userInput,
        complete: false,
      }
      dispatch(addTodo(newItem));
 
      toast.success('Task added successfull');
    }
    else {
      toast.warn('🦄 Empty text input');
    }
  };

  const removeTask = (_id) => {
    dispatch(deleteTodo(_id));
    toast.success('Task deleted',);
  };

  const handleToggle =  (todo) => {
    dispatch(toggleTodo({_id: todo._id, complete: todo.complete}));
    if (!todo.complete) {toast.success('Task done!');}
  }

  const removeCompleted = (completed) => {
    dispatch(deleteCompleted(url, completed)); 
  }

  const setCompletedAll =  (completed) => {
    dispatch(setComplAll(completed));
  }
  const activeLength = tasks.filter(todo => !todo.complete).length;
  console.log(activeLength);
  const totalLength = tasks.length;

    return (
    <div className="App">
    <Header />
    <div className="shadow">
      <ToDoForm
      addTask={addTask}
      totalLength={totalLength}
      toggleTodos={setCompletedAll}
      allCompleted={!activeLength}
      />
      {tasks.filter(todo =>
        (filter === 'All') ||
        (filter === 'Active' && !todo.complete) ||
        (filter === 'Completed' && todo.complete)
      ).map(todo => {
        return (
          <ToDo
          todo={todo}
          key={todo._id}
          removeTask={() => removeTask(todo._id)}
          toggleTask={() => handleToggle(todo)}
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
      autoClose={1000}
      />
    </div>
  </div>);
};
export default NewApp;