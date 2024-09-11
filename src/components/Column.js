import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { openModal, updateTask } from '../store/slices/taskSlice';
import Task from './Task';

const Column = ({ status, tasks }) => {
    const dispatch = useDispatch();

    const [{ isOver }, ref] = useDrop({
        accept: 'TASK',
        drop: (item) => {
            if (item.task) {
                dispatch(updateTask({ ...item.task, status }));
            }
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <div
            ref={ref}
            className={`w-[25%] min-h-screen flex flex-col p-2 border-r-4 border-orange ${isOver ? 'bg-red-900' : ''}`}
        >
            <h2 className='font-black text-2xl text-white'>{status}</h2>
            {tasks.map((task) => (
                <Task key={task._id} task={task} />
            ))}
            <button
                className="mt-auto p-2 bg-green-400 text-white"
                onClick={() => dispatch(openModal({ mode: 'create', task: null }))}
            >
                Add Task
            </button>
        </div>
    );
};

export default Column;
