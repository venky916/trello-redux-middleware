import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, createTask, updateTask } from '../store/slices/taskSlice';

// Converts date to YYYY-MM-DD format
const formatDateForInput = (date) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Returns YYYY-MM-DD
};

const TaskModal = () => {
    const dispatch = useDispatch();
    const { modalOpen, modalMode, currentTask } = useSelector((state) => state.tasks);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('To-Do');
    const [priority, setPriority] = useState('Low');
    const [deadline, setDeadline] = useState(formatDateForInput(new Date())); // Default to current date in YYYY-MM-DD format

    useEffect(() => {
        if (modalMode === 'edit' && currentTask) {
            setTitle(currentTask.title);
            setDescription(currentTask.description);
            setStatus(currentTask.status);
            setPriority(currentTask.priority || 'Low'); // Default to 'Low' if priority is undefined
            setDeadline(formatDateForInput(currentTask.deadline) || formatDateForInput(new Date())); // Format date
        } else {
            setTitle('');
            setDescription('');
            setStatus('To-Do');
            setPriority('Low');
            setDeadline(formatDateForInput(new Date())); // Default to current date in YYYY-MM-DD format
        }
    }, [modalMode, currentTask]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (modalMode === 'edit') {
            dispatch(updateTask({
                ...currentTask,
                title,
                description,
                status,
                priority,
                deadline,
            }));
        } else {
            dispatch(createTask({
                title,
                description,
                status,
                priority,
                deadline,
            }));
        }

        dispatch(closeModal());
    };

    if (!modalOpen) return null;

    return (
        <div className="modal">
            <div className="bg-orange w-[50%] p-5 m-5 rounded-lg">
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-xl font-bold'>{modalMode === 'edit' ? 'Edit Task' : 'Create Task'}</h2>
                    <button className='text-lg font-semibold' onClick={() => dispatch(closeModal())}>Close</button>
                </div>

                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className='my-2 p-2 border rounded'
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className='my-2 p-2 border rounded'
                    />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className='my-2 p-2 border rounded'
                    >
                        <option value="To-Do">To-Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className='my-2 p-2 border rounded'
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="Urgent">Urgent</option>
                    </select>
                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className='my-2 p-2 border rounded'
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
                        {modalMode === 'edit' ? 'Update' : 'Create'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;
