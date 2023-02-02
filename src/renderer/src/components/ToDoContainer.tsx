import { useDndMonitor } from '@dnd-kit/core';
import { DragEndEvent, UniqueIdentifier } from '@dnd-kit/core/dist/types';
import { useState } from 'react';
import Droppable from './Droppable/Droppable';
import TaskItem from './Task/TaskItem';

const ToDoContainer = () => {
    const [parent, setParent] = useState<UniqueIdentifier | null>(null);

    const handleDragEnd = ({ over, active }: DragEndEvent) => {
        if (over && over.data.current?.accepts.includes(active.data.current?.type)) {
            setParent(over.id);
        }
    };

    useDndMonitor({ onDragEnd: handleDragEnd });

    return (
        <Droppable id="toDo" className="bg-slate-700 w-full m-2">
            {parent === 'toDo' ? <TaskItem id={'lkjasd'} title="TEST" checked={true} /> : null}
        </Droppable>
    );
};

export default ToDoContainer;
