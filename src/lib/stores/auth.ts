import { writable } from 'svelte/store';
import { browser } from '$app/environment';

interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    is_company_admin: boolean;
    [key: string]: any;
}

interface AuthState {
    token: string | null;
    user: App.User | null;
}

const STORAGE_KEY = 'auth_state';

function createAuthStore() {
    const initialState: AuthState = browser
        ? JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"token":null,"user":null}')
        : { token: null, user: null };

    const { subscribe, set, update } = writable<AuthState>(initialState);

    if (browser) {
        subscribe((state) => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        });
    }

    return {
        subscribe,
        setAuth: (token: string, user: User) => {
            set({ token, user });
        },
        setUser: (user: User) => {
            update((state) => ({ ...state, user }));
        },
        setToken: (token: string) => {
            update((state) => ({ ...state, token }));
        },
        clear: () => {
            set({ token: null, user: null });
        },
        getToken: (): string | null => {
            let token: string | null = null;
            subscribe((state) => {
                token = state.token;
            })();
            return token;
        },
        getUser: (): User | null => {
            let user: User | null = null;
            subscribe((state) => {
                user = state.user;
            })();
            return user;
        },
    };
}

export const authStore = createAuthStore();
