import { ReactNode } from 'react';
import { useDraggable } from '@dnd-kit/core';

type DraggableProps = {
    id: any;
    children: ReactNode;
    className: string;
    dragType: string;
};

const Draggable = ({ id, children, className, dragType }: DraggableProps) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id,
        data: {
            type: dragType
        }
    });

    return (
        <div {...attributes} {...listeners} ref={setNodeRef} className={className}>
            {children}
        </div>
    );
};

export default Draggable;
