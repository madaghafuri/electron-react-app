import { UniqueIdentifier } from '@dnd-kit/core/dist/types';
import { atom } from 'jotai';

export type Task = {
    title: string;
    id: UniqueIdentifier;
};

export const taskList: Task[] = [
    { title: 'Go for a walk', id: '1' },
    { title: 'Sweep the floor', id: '2' },
    { title: 'cook breakfast', id: '3' }
];

export const activeId = atom<UniqueIdentifier | null>(null);
export const tasks = atom<Task[]>(taskList);
