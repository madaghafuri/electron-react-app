import { DragEndEvent, useDndMonitor } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { tasks } from '@renderer/utils/atom';
import { useAtom } from 'jotai';
import Droppable from './DragNDrop/Droppable';
import NewItem from './Task/NewItem';

const NewContainer = () => {
    const [taskList, setTaskList] = useAtom(tasks);

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        if (active.id !== over?.id) {
            setTaskList((tasks) => {
                const oldIndex = tasks.findIndex((task) => task.id === active.id);
                const newIndex = tasks.findIndex((task) => task.id === over?.id);

                return arrayMove(tasks, oldIndex, newIndex);
            });
        }
    };

    useDndMonitor({ onDragEnd: handleDragEnd });

    return (
        <div>
            <SortableContext items={taskList} strategy={verticalListSortingStrategy}>
                <Droppable id="new">
                    <div className="flex flex-col gap-2">
                        {taskList.map((task) => {
                            return <NewItem key={task.id} id={task.id} title={task.title} />;
                        })}
                    </div>
                </Droppable>
            </SortableContext>
        </div>
    );
};

export default NewContainer;
