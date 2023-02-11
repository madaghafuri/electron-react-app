import {
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import { FC, PropsWithChildren } from 'react';

const DragDropContext: FC<PropsWithChildren> = ({ children }) => {
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 5
            }
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5
            }
        }),
        useSensor(KeyboardSensor)
    );

    return <DndContext sensors={sensors}>{children}</DndContext>;
};

export default DragDropContext;
