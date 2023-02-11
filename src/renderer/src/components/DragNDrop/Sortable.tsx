import { useSortable } from '@dnd-kit/sortable';
import { ReactNode } from 'react';
import { CSS } from '@dnd-kit/utilities';

type SortableProps = {
    id: any;
    children: ReactNode;
    className?: string;
    type: string;
};

const Sortable = ({ id, children, className, type }: SortableProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id,
        data: {
            type: type
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <div {...attributes} {...listeners} style={style} ref={setNodeRef} className={className}>
            {children}
        </div>
    );
};

export default Sortable;
