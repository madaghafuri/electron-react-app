import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { createPortal } from 'react-dom';
import TaskItem from './Task/TaskItem';
import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core/dist/types';
import { useAtom } from 'jotai';
import { activeId, tasks } from '@renderer/utils/atom';

const DoneContainer = () => {
    const [taskList, setTaskList] = useAtom(tasks);
    const [activeID, setActiveId] = useAtom(activeId);

    const activeIndex = taskList.findIndex((value) => value.id === activeID);

    const handleDragStart = ({ active }: DragStartEvent) => {
        setActiveId(active.id);
    };

    const handleDragEnd = ({ over, active }: DragEndEvent) => {
        if (over?.id !== active.id) {
            setTaskList((tasks) => {
                const oldIndex = tasks.indexOf(tasks[activeIndex]);
                const newIndex = tasks.indexOf(tasks[-1]);

                return arrayMove(tasks, oldIndex, newIndex);
            });
        }
        setActiveId(null);
    };

    const handleDragOver = ({}: DragOverEvent) => {};

    useDndMonitor({
        onDragEnd: handleDragEnd,
        onDragStart: handleDragStart,
        onDragOver: handleDragOver
    });

    return (
        <div className="bg-slate-200 p-2 rounded-md flex flex-col gap-2">
            <SortableContext id="done" strategy={verticalListSortingStrategy} items={taskList}>
                {taskList.map((task) => (
                    <TaskItem key={task.id} id={task.id} checked={true} title={task.title} />
                ))}
            </SortableContext>
            {createPortal(
                <DragOverlay adjustScale={false}>
                    {activeID ? (
                        <TaskItem
                            id={activeID}
                            checked={true}
                            title={taskList[activeIndex].title}
                        />
                    ) : null}
                </DragOverlay>,
                document.body
            )}
        </div>
    );
};

export default DoneContainer;
