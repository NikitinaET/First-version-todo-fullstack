import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import axios from "axios";
const url = 'http://localhost:1025/api/tasks/';

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        items: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

        .addCase(loadTodo.fulfilled, (state, action) => {
            state.items = action.payload;
        })

        .addCase(addTodo.fulfilled, (state, action) => {
            state.items = [...state.items, action.payload];
        })

        .addCase(toggleTodo.fulfilled, (state, action) => {
            state.items = state.items.map(todo => {
                if (todo._id === action.payload) return {...todo, complete:  !todo.complete };
                return todo;
            }) 
        })

        .addCase(deleteTodo.fulfilled, (state, action) => {
            state.items = state.items.filter(todo => action.payload !== todo._id)
        })

        .addCase(changeTodo.fulfilled, (state, action) => {
            state.items = state.items.map(todo => ({
                ...todo, task: todo._id === action.payload._id ? todo.task: action.payload.text  
            }))
        })

        .addCase(deleteCompleted.fulfilled, (state, action) => {
            state.items = state.items.filter(todo => !todo.complete)
        })

        .addCase(setComplAll.fulfilled, (state, action) => {
            state.items = state.items.map(todo => ({ ...todo, complete: action.payload.complete }))
        })
    },
});

export const loadTodo = createAsyncThunk('todos/loadTodo',
async () => {
    try {
        const response = await axios.get(url);
        return response.data;
    }
    catch (e){
        toast.error(`🤔 Sorry, we cannot load data from server, some error...`);
        throw new Error('🤔 Server error, cannot get tasks');
    }
});
//, , , ,  
export const addTodo = createAsyncThunk('todos/addTodo',
async (text) => {
    try {
        const response = await axios.post(url, text);
        return response.data;
    }
    catch (e){
        toast.error("🤔 Can not add new task, server error: " + e);
        throw new Error('🤔 Server error, can not add new task');
    }
});
export const deleteTodo = createAsyncThunk('todos/deleteTodo',
async (_id) => {
    try {
        await axios.delete(url + _id);
        return _id;
    }
    catch (e){
        toast.error("🤔 Can not delete task, server error: " + e);
        throw new Error('🤔 Server error, can not delete task');
    }
});

export const deleteCompleted = createAsyncThunk('todos/deleteCompleted',
async () => {
    try {
        await axios.delete(url);
    }
    catch (e){
        toast.error("🤔 Can not change tasks, server error: " + e);
        throw new Error('🤔 Server error, can not delete tasks');
    }
});

export const setComplAll = createAsyncThunk('todos/setComplAll',
async (complete) => {
    try {
        await axios.put(url, { complete });
        return {complete};
    }
    catch (e){
        toast.error("🤔 Can not change tasks, server error: " + e);
        throw new Error('🤔Server error, can not change tasks');
    }
});

export const toggleTodo = createAsyncThunk('todos/toggleTodo',
async ({ _id, complete }) => {
    try {
        const isCompleted = { complete: !complete };
        await axios.put(url + _id, isCompleted)
        return _id;
    }
    catch (e){
        toast.error("🤔 Can not change task, server error: " + e);
        throw new Error('🤔 Server error, can not update task');
    }
});

export const changeTodo = createAsyncThunk('todos/changeTodo',
async ( {_id, text} ) => {
    try {
        await axios.put(url + _id, {task: text});
        //console.log(text);
        return { _id, text };
    }
    catch (e){
        toast.error("🤔 Cannot change task, server error: " + e);
        throw new Error('🤔 Server error, can not update task');
    }
});

export default todoSlice.reducer;