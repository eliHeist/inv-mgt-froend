import { writable } from 'svelte/store';
import { browser } from '$app/environment';



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
        setAuth: (token: string, user: App.User) => {
            set({ token, user });
        },
        setUser: (user: App.User) => {
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
        getUser: (): App.User | null => {
            let user: App.User | null = null;
            subscribe((state) => {
                user = state.user;
            })();
            return user;
        },
    };
}

export const authStore = createAuthStore();
