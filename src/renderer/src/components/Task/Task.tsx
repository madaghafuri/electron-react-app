import { DragOverlay } from '@dnd-kit/core';
import TaskItem from './TaskItem';
import { createPortal } from 'react-dom';
import { useAtom } from 'jotai/react';
import { tasks } from '@renderer/utils/atom';

const Task = () => {
    const [taskList] = useAtom(tasks);

    return (
        <div>
            {taskList.map((task) => {
                return <TaskItem key={task.id} id={task.id} title={task.title} checked={false} />;
            })}
            {createPortal(
                <DragOverlay>
                    <TaskItem id="HEHEHE" checked={false} title="HEHEHE" />
                </DragOverlay>,
                document.body
            )}
        </div>
    );
};

export default Task;
