import { useDndMonitor } from '@dnd-kit/core';
import { DragEndEvent, UniqueIdentifier } from '@dnd-kit/core/dist/types';
import { useState } from 'react';
import { useAtom } from 'jotai';
import Droppable from './DragNDrop/Droppable';
import TaskItem from './Task/TaskItem';
import { activeId, tasks } from '@renderer/utils/atom';
import { SortableContext } from '@dnd-kit/sortable';

const ToDoContainer = () => {
    const [taskList, setTaskList] = useAtom(tasks);
    const [activeID, setActiveID] = useAtom(activeId);

    return (
        <div className="flex flex-col w-1/2 h-full">
            <text>To Do</text>
            <SortableContext items={taskList}>
                <Droppable
                    id="todo"
                    className="w-full h-full p-2 bg-slate-400 rounded-md"
                ></Droppable>
            </SortableContext>
        </div>
    );
};

export default ToDoContainer;
