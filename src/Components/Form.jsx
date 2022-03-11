import {useState} from 'react';
  function ToDoForm({addTask, allCompleted, totalLength, toggleTodos}) {
    const [userInput, setUserInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(userInput);
        setUserInput('');
    }

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <label className={`${!totalLength ? "invisible" : "gray-arrow__label"} ${allCompleted ? "gray-arrow__label__completed" : ""}`}
            >
            <input type="checkbox" className="invisible"
            onChange={() => {toggleTodos(!allCompleted)}}
            checked={allCompleted}
            />
            </label> 
              <input
            className="new-note"
            value={userInput}
            type="text"
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            placeholder="What needs to be done?"
            />   
        </form> 
    )
}
export default ToDoForm;