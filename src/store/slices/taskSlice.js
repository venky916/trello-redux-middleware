import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import taskService from '../../services/taskService';

// Thunks for CRUD operations
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await taskService.getTasks();
    return response;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task) => {
    const { _id, ...updatedData } = task;
    const response = await taskService.updateTask(_id, updatedData);
    return response;
});

export const createTask = createAsyncThunk('tasks/createTask', async (task) => {
    const response = await taskService.createTask(task);
    return response;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId) => {
    await taskService.deleteTask(taskId);
    return taskId;
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        loading: false,
        modalOpen: false,
        modalMode: 'create', // 'create' or 'edit'
        currentTask: null,
    },
    reducers: {
        openModal: (state, action) => {
            state.modalOpen = true;
            state.modalMode = action.payload.mode;
            state.currentTask = action.payload.task || null;
        },
        closeModal: (state) => {
            state.modalOpen = false;
            state.currentTask = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.tasks = action.payload;
                state.loading = false;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(task => task._id === action.payload._id);
                state.tasks[index] = action.payload;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task._id !== action.payload);
            });
    }
});

export const { openModal, closeModal } = taskSlice.actions;
export default taskSlice.reducer;
