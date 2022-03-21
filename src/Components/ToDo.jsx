import { useState } from 'react';
import { changeTodo } from '../store/createSlice';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

function ToDo({ todo, toggleTask, removeTask }) {
    const [editMode, setEditMode] = useState(false);
    const [current, setCurrent] = useState(todo.task);
    const [prev, setPrev] = useState(current);
    const dispatch = useDispatch();

    const changeInput = (e) => {
        setCurrent(e.target.value);
    }

    const changeTask = (text) => {
        const input = text.trim();
        if (input) {
            dispatch(changeTodo({_id: todo._id, text: input}));
            setEditMode(false);
            setCurrent(current.trim() || prev);
        } else {
            toast.error('🦄 You don\'t change text');
        }
    }

    const handleKeyPress = (e) => {
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
        <div key={todo._id} className="item-todo">
            <label className={`green-arrow__label ${todo.complete ? "green-arrow__label_completed" : ""}`}>
                <input type="checkbox" className="green-arrow" onChange={() => { toggleTask(todo) }} />
            </label>
            {!editMode ? <div className={todo.complete ? "item-text strike" : "item-text"}
                onDoubleClick={handleDoubleClick}
            >
                {current}
            </div>
                : <input
                    type="text"
                    value={current}
                    onInput={changeInput}
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
                autoClose={1000}
            />
        </div>
    )
}
export default ToDo;