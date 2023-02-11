import { UniqueIdentifier } from '@dnd-kit/core/dist/types';
import classNames from 'classnames';
import Draggable from '../DragNDrop/Draggable';

type TaskItemProps = {
    title: string;
    checked: boolean;
    id: string | UniqueIdentifier | null;
    className?: string;
};

const TaskItem = ({ title, id, className }: TaskItemProps) => {
    return (
        <Draggable
            id={id}
            dragType="task"
            className={classNames(
                className,
                'flex flex-row justify-between px-3 py-1 bg-slate-300 rounded-md'
            )}
        >
            <div>{title}</div>
        </Draggable>
    );
};

export default TaskItem;
