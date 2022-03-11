import { ADD_TODO, UPDATE_TODO, DEL_TODO,  DEL_COMPLETED, SET_ALL_COMPLETED, LOAD_TODO, UPDATE_CHECK_STATUS,  } from './actionsTypes';

const initialState = {
    items: [], 
};

export const todoReducer = (state = initialState, { payload, type }) => {
    switch (type) {

      case LOAD_TODO:
          return {
            ...state,
            items: payload
        }

      case ADD_TODO:   
        return {
            ...state, 
            items: [...state.items, payload]
          };

        case UPDATE_TODO :
            console.log(payload, 'payload update')
            return {
                ...state,
                items: state.items.map(todo => ({
                    ...todo, task: todo._id === payload._id ? todo.task: payload.text
                }))
            };
                   
        case UPDATE_CHECK_STATUS :
            return {
                ...state,
                items: state.items.map(todo => {
                    if (todo._id === payload) return {...todo, complete:  !todo.complete };
                    return todo;
                }) 
            };

        case DEL_TODO :
            return {
                ...state,
                items: state.items.filter(todo => payload !== todo._id)
            };
        
        case DEL_COMPLETED :
            return {
                ...state,
                items: state.items.filter(todo => !todo.complete)
            };
        
        case SET_ALL_COMPLETED :
            console.log('allComplete', payload)
            return {
                ...state,
                items: state.items.map(todo => ({ ...todo, complete: payload.complete }))
            };

            default :
            return state;
    }
};