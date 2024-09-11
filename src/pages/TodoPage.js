import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Column from '../components/Column';
import TaskModal from '../components/TaskModal';
import { fetchTasks, updateTask } from '../store/slices/taskSlice';

const TodoPage = () => {
    const dispatch = useDispatch();
    const { tasks, loading } = useSelector((state) => state.tasks);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleDrop = (task, status) => {
        dispatch(updateTask({ ...task, status }));
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="todo-page">
            <div className="flex flex-wrap p-2 bg-black">
                {['To-Do', 'In Progress', 'Under Review', 'Completed'].map((status) => (
                    <Column
                        key={status}
                        status={status}
                        tasks={tasks.filter((task) => task.status === status)}
                        onDrop={handleDrop}
                    />
                ))}
            </div>
            <TaskModal />
        </div>
    );
};

export default TodoPage;
