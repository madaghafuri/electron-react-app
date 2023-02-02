import { UniqueIdentifier } from '@dnd-kit/core/dist/types';
import Draggable from '../Draggable/Draggable';

type TaskItemProps = {
    title: string;
    checked: boolean;
    id: string | UniqueIdentifier | null;
};

const TaskItem = ({ title, id }: TaskItemProps) => {
    return (
        <Draggable id={id} dragType="task" className="flex flex-row justify-between px-3 py-1">
            <div>{title}</div>
        </Draggable>
    );
};

export default TaskItem;
