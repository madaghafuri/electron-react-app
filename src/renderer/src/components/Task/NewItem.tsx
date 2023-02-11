import { UniqueIdentifier } from '@dnd-kit/core';
import classNames from 'classnames';
import Sortable from '../DragNDrop/Sortable';

type NewItemProps = {
    id: UniqueIdentifier | string | null;
    title: string;
    className?: string;
};

const NewItem = ({ id, title, className }: NewItemProps) => {
    return (
        <Sortable
            id={id}
            type="item"
            className={classNames(
                className,
                'flex flex-row justify-between px-3 py-1 bg-slate-300 rounded-md'
            )}
        >
            <div>{title}</div>
        </Sortable>
    );
};

export default NewItem;
