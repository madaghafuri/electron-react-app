import { FC, PropsWithChildren } from 'react';
import { useDroppable } from '@dnd-kit/core';
import classNames from 'classnames';

interface DroppableProps {
    id: any;
    className?: string;
}

const Droppable: FC<PropsWithChildren<DroppableProps>> = ({ id, children, className }) => {
    const { setNodeRef, isOver } = useDroppable({
        id,
        data: {
            accepts: ['task']
        }
    });

    return (
        <div
            ref={setNodeRef}
            className={classNames(isOver ? 'outline outline-offset-2 outline-2' : '', className)}
        >
            {children}
        </div>
    );
};

export default Droppable;
