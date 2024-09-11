import { BASE_URL } from '../utils/constants';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Yjg4MDk4YWYxYzg4MDI1NGVkZjIxZCIsImlhdCI6MTcyMzM4ODIwMSwiZXhwIjoxNzI1OTgwMjAxfQ.Ev7DZQd0_TZqb6aOH9_2JPJ043haF2mMU0xdksoEZ6w"; // Replace with actual token or use a better token management approach

const getTasks = async () => {
    const response = await fetch(`${BASE_URL}/api/tasks`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }

    return response.json();
};

const updateTask = async (taskId, updatedData) => {
    const response = await fetch(`${BASE_URL}/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
        throw new Error('Failed to update task');
    }

    return response.json();
};

const deleteTask = async (taskId) => {
    const response = await fetch(`${BASE_URL}/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete task');
    }
};

const createTask = async (taskData) => {
    const response = await fetch(`${BASE_URL}/api/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
    });

    if (!response.ok) {
        throw new Error('Failed to create task');
    }

    return response.json();
};

const taskService = {
    getTasks,
    updateTask,
    createTask,
    deleteTask,
};

export default taskService;
