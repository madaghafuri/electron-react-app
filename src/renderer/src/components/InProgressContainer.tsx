import { DragEndEvent, UniqueIdentifier } from '@dnd-kit/core/dist/types';
import { useDndMonitor } from '@dnd-kit/core';
import { useState } from 'react';
import Droppable from './DragNDrop/Droppable';
import TaskItem from './Task/TaskItem';

const InProgressContainer = () => {
    const [parent, setParent] = useState<UniqueIdentifier | null>(null);

    const handleDragEnd = ({ over, active }: DragEndEvent) => {
        if (over && over.data.current?.accepts.includes(active.data.current?.type)) {
            setParent(over.id);
        }
    };

    useDndMonitor({ onDragEnd: handleDragEnd });

    return (
        <Droppable id="inProgress" className="bg-slate-600 w-full m-2">
            {parent === 'inProgress' ? <TaskItem id="" title="TIST" checked={true} /> : null}
        </Droppable>
    );
};

export default InProgressContainer;
