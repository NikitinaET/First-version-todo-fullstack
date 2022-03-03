import {useState} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const url = 'http://localhost:1025/api/tasks/';

function ToDo({todo, toggleTask, removeTask}) {
    const [editMode, setEditMode] = useState(false);
    const [current, setCurrent] = useState(todo.task);
    const [prev, setPrev] = useState(current);
    
    const changeText =  (e) => {       
      setCurrent(e.target.value);
    }
    
    const changeTask = async (text) => {
        try {
            const input = text.trim();
            if (input) {
                await axios.put(url+todo._id, {task: input});
                setEditMode(false);
                setCurrent(current.trim() || prev);
            } else {
                toast.error('🦄 You don\'t change text');
            }   
        }
        catch (e) {
            toast.error(e.message);
            console.log(e.message);
        }     
    }

    const handleKeyPress =  (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            changeTask(e.target.value);
        }
    }

    const handleDoubleClick = () => {
        setEditMode(true);
        setPrev(current);
    }

    const loseFocus = () => {
        setEditMode(false);
        setCurrent(prev);
    }

    return (
        <div key={todo.id} className="item-todo">
            <label className={`green-arrow__label ${todo.complete ? "green-arrow__label_completed" : ""}`}>
            <input type="checkbox" className="green-arrow" onChange={() => {toggleTask(todo)}}/>
            </label>
            {!editMode ? <div className={todo.complete ? "item-text strike" : "item-text"}
            onDoubleClick={handleDoubleClick}
            >
                {current}
            </div>
            : <input 
            type="text"
            value={current}
            onInput={changeText}
            onKeyDown={handleKeyPress}
            autoFocus={true}
            className="item-change"
            onBlur={loseFocus}
            />}
            <div className="item-delete"
            onClick={() => removeTask(todo)}
            >
                &times;
            </div>
            <ToastContainer
             hideProgressBar={false}
             autoClose={2000}
             />
        </div>
    )
}
export default ToDo;