import { useState } from 'react';
import { changeTodo, changeDescription } from '../store/createSlice';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Modal, Box, Typography } from '@mui/material';

function ToDo({ todo, toggleTask, removeTask }) {
    const [editMode, setEditMode] = useState(false);
    const [editMode2, setEditMode2] = useState(false);
    const [current, setCurrent] = useState(todo.task);
    const [current2, setCurrent2] = useState(todo.description)
    const [prev, setPrev] = useState(current);
    const [prev2, setPrev2] = useState(current2);
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    const changeInput = (e) => {
        setCurrent(e.target.value);
    };

    const changeInput2 = (e) => {
        setCurrent2(e.target.value);
    };

    const changeTask = (text) => {
        const input = text.trim();
        if (input) {
            const res = dispatch(changeTodo({_id: todo._id, text: input}));
            console.log('change', res);
            setEditMode(false);
            setCurrent(current.trim() || prev);
        } else {
            toast.error('🦄 You don\'t change text');
        }
    };

    const addDescription = (text) => {
        const input = text.trim();
        if (input) {
            const res = dispatch(changeDescription({_id: todo._id, description: input}));
            console.log(res);
            setEditMode2(false);
            setCurrent2(current2.trim() || prev2);
        } else {
            toast.error('🦄 You don\'t change text');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            changeTask(e.target.value);
        }
    };

    const handleKeyPress2 = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addDescription(e.target.value);
        }
    };

    const handleDoubleClick = () => {
        setEditMode(true);
        setPrev(current);
    };

    const handleClick = () => {
        setEditMode2(true);
        setPrev2(current2);
    };

    const loseFocus = () => {
        setEditMode(false);
        setCurrent(prev);
    };

    const loseFocus2 = () => {
        setEditMode2(false);
        setCurrent2(prev2);  
    };

    const date = new Date(todo.created);
    const newDate = date.toLocaleDateString();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

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
               
                <div>
                    <Button size="small"
                    onClick={() => setOpen(true)}
                    >
                        Info
                        </Button>
                        <Modal
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                Created on {newDate}
                                </Typography>

                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    About todo
                                </Typography>

                                {!editMode2 ?

                                <Typography  
                                onClick={handleClick}>
                                    {current2}
                                    </Typography> :

                                    <input
                                        type="text"
                                        value={current2}
                                        onInput={changeInput2}
                                        onKeyDown={handleKeyPress2}
                                        autoFocus={true}
                                        className="item-change"
                                        onBlur={loseFocus2}
                                        />     
                                }
                                        
                            </Box>
                        </Modal>
                </div>
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