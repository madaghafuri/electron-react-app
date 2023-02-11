import { DragEndEvent, DragOverEvent, UniqueIdentifier, useDndMonitor } from '@dnd-kit/core';
import { activeId, tasks } from '@renderer/utils/atom';
import { useAtom } from 'jotai';
import { useState } from 'react';
import Droppable from './DragNDrop/Droppable';
import TaskItem from './Task/TaskItem';

const Trashable = () => {
    const [parentId, setParentId] = useState<UniqueIdentifier | null>(null);
    const [isOver, setIsOver] = useState<boolean>(false);
    const [activeID] = useAtom(activeId);
    const [taskList] = useAtom(tasks);
    const activeIndex = taskList.findIndex((task) => task.id === activeID);

    const handleDragEnd = ({ over, active }: DragEndEvent) => {
        setIsOver(false);
        if (over && over.data.current?.accept.includes(active.data.current?.type)) {
            setParentId(over.id);
        }
    };

    const handleDragOver = ({ over }: DragOverEvent) => {
        if (over && over.id === 'trash') {
            setIsOver(true);
        }
        if (!over) {
            setIsOver(false);
        }
    };

    const handleDragCancel = () => {
        setIsOver(false);
    };

    useDndMonitor({
        onDragEnd: handleDragEnd,
        onDragOver: handleDragOver,
        onDragCancel: handleDragCancel
    });

    return (
        <div className="flex w-1/2 bg-slate-600 rounded-md">
            <Droppable id="trash" className="w-full rounded-md">
                {parentId === 'trash' ? (
                    <TaskItem
                        id={taskList[activeIndex].id}
                        title={taskList[activeIndex].title}
                        checked={true}
                    />
                ) : null}
                {isOver ? (
                    <TaskItem
                        id={taskList[activeIndex].id}
                        title={taskList[activeIndex].title}
                        checked={true}
                        className="opacity-50"
                    />
                ) : null}
            </Droppable>
        </div>
    );
};

export default Trashable;
