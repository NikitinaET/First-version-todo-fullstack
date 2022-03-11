import axios from 'axios';
import { ADD_TODO, UPDATE_TODO, DEL_TODO,  DEL_COMPLETED, SET_ALL_COMPLETED, LOAD_TODO, UPDATE_CHECK_STATUS} from './actionsTypes';

const url = 'http://localhost:1025/api/tasks/';

export function loadTodo() {
    return async dispatch => {
        try {
            const response = await axios.get(url)
                dispatch({
                    type: LOAD_TODO,
                    payload: response.data
                });
        } catch (e) {
            console.log(e.message);
        }        
    }
};

export function addTodo(newTask) {
    return async dispatch => {
        try {
            const task = (await axios.post(url, newTask)).data;
            dispatch({
                type: ADD_TODO,
                payload: {...newTask, _id: task._id}
            });
        }
        catch (e) {
            console.log(e.message);
        } 
    }
  };
  
export function toggleTodo({ _id, complete }) {
    return async dispatch => {
        try {
            const isCompleted = { complete: !complete }
            await axios.put(url + _id, isCompleted);
            
            dispatch({
                type: UPDATE_CHECK_STATUS, 
                payload: _id
            });
        }
        catch (e) {
            console.log(e.message);
        }
    }
  };

export function deleteCompleted() {
    return async dispatch => {
        try {
            await axios.delete(url);
            dispatch({
                type: DEL_COMPLETED,
            });
        }
        catch (e) {
            console.log(e.message);
        }    
    }
};

export function setComplAll(complete) {
    return async dispatch => {
        try {
            const res = await axios.put(url, {complete});
            console.log(res)
            dispatch({
               type: SET_ALL_COMPLETED,
               payload: {complete}
            });    
        }
        catch (e) {
            console.log(e.message);
        }
        
    }
};

export function deleteTodo(_id) {
  return async dispatch => {
      try {
          await axios.delete(url + _id);
          dispatch({
             type: DEL_TODO,
             payload: _id 
          });
      }
      catch (e) {
        console.log(e.message);
      }  
    }
};

export function changeText( _id, text) {
    return async dispatch => {
        try {
             await axios.put(url+_id, {task: text});
  
            dispatch({
                type: UPDATE_TODO,
                payload: { _id, text }  
            });
        }
        catch (e) {
          console.log(e.message);
        }  
    }
};