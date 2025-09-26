import { writable } from 'svelte/store';

export const toast = writable<{
    title: string;
    message: string;
    type: string | undefined
} | null>(null);

export function showToast(
    message: string,
    title: string = '',
    type = 'default',
    duration = 3000
) {
    toast.set({ message, title, type });

    setTimeout(() => toast.set(null), duration);
}
