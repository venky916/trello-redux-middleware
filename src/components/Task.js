import React from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { openModal, deleteTask } from '../store/slices/taskSlice';

const Task = ({ task }) => {
    const dispatch = useDispatch();
    const [{ isDragging }, dragRef] = useDrag({
        type: 'TASK',
        item: { task },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div
            ref={dragRef}
            className={`task my-2 p-2 flex flex-col justify-start align-middle border-orange hover:border-2 text-t-white transition-opacity duration-300 ${isDragging ? 'bg-orange-200 opacity-50' : ''}`}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <h3 className='font-medium text-lg text-l-white'>{task.title}</h3>
            <p className='text-lg text-wrap'>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Deadline: {formatDate(task.deadline)}</p>
            <div className='flex justify-between items-center py-2'>
                <button
                    onClick={() => dispatch(openModal({ mode: 'edit', task }))}
                    className='bg-orange text-l-white text-lg font-bold px-4 rounded-lg'
                >
                    Edit
                </button>
                <button
                    onClick={() => dispatch(deleteTask(task._id))}
                    className='bg-white text-black text-lg font-bold px-4 rounded-lg'
                >
                    Delete
                </button>
            </div>
            <hr />
        </div>
    );
};

export default Task;
