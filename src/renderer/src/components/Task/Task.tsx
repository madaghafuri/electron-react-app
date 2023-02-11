import { DragEndEvent, DragOverlay, DragStartEvent, useDndMonitor } from '@dnd-kit/core';
import TaskItem from './TaskItem';
import { createPortal } from 'react-dom';
import { useAtom } from 'jotai/react';
import { activeId, tasks } from '@renderer/utils/atom';

const Task = () => {
    const [taskList] = useAtom(tasks);
    const [activeID, setActiveId] = useAtom(activeId);
    const activeIndex = taskList.findIndex((task) => task.id === activeID);

    const handleDragStart = ({ active }: DragStartEvent) => {
        setActiveId(active.id);
    };

    const handleDragEnd = ({ over, active }: DragEndEvent) => {
        setActiveId(null);
    };

    useDndMonitor({ onDragStart: handleDragStart, onDragEnd: handleDragEnd });

    return (
        <div>
            <div className="flex flex-col gap-2">
                {taskList.map((task) => {
                    return (
                        <TaskItem key={task.id} id={task.id} title={task.title} checked={false} />
                    );
                })}
            </div>
            {createPortal(
                <DragOverlay adjustScale={false}>
                    {activeID ? (
                        <TaskItem
                            id={taskList[activeIndex].id}
                            checked={false}
                            title={taskList[activeIndex].title}
                        />
                    ) : null}
                </DragOverlay>,
                document.body
            )}
        </div>
    );
};

export default Task;
