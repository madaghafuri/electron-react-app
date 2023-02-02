import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { createPortal } from 'react-dom';
import TaskItem from './Task/TaskItem';
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core/dist/types';
import { useAtom } from 'jotai';
import { activeId, tasks } from '@renderer/utils/atom';

const DoneContainer = () => {
    const [taskList, setTaskList] = useAtom(tasks);
    const [active, setActive] = useAtom(activeId);

    const activeIndex = taskList.findIndex((value) => value.id === active);

    const handleDragStart = ({ active }: DragStartEvent) => {
        setActive(active.id);
    };

    const handleDragEnd = ({ over, active }: DragEndEvent) => {
        setActive(null);
        if (over?.id !== active.id) {
            setTaskList((tasks) => {
                const oldIndex = tasks.indexOf(tasks[active.id]);
                const newIndex = tasks.indexOf(tasks[over?.id || -1]);

                return arrayMove(tasks, oldIndex, newIndex);
            });
        }
    };

    useDndMonitor({ onDragEnd: handleDragEnd, onDragStart: handleDragStart });

    return (
        <div>
            <SortableContext id="done" strategy={verticalListSortingStrategy} items={taskList}>
                {taskList.map((task) => (
                    <TaskItem key={task.id} id={task.id} checked={true} title={task.title} />
                ))}
            </SortableContext>
            {createPortal(
                <DragOverlay adjustScale={false}>
                    <TaskItem id={active} checked={true} title={taskList[activeIndex]?.title} />
                </DragOverlay>,
                document.body
            )}
        </div>
    );
};

export default DoneContainer;
