import { authStore } from './stores/auth';
import { PUBLIC_API_URL } from "$env/static/public";

const API_URL = PUBLIC_API_URL;

export async function login(email: string, password: string): Promise<boolean> {
    try {
        const response = await fetch(`${API_URL}/auth/token/pair`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            return false;
        }

        const data = await response.json();
        authStore.setToken(data.access);

        await getMe();

        return true;
    } catch (error) {
        console.error('Login error:', error);
        return false;
    }
}

export async function logout(): Promise<void> {
    try {
        await fetch(`${API_URL}/auth/token/blacklist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        authStore.clear();
    }
}

export async function refreshToken(): Promise<boolean> {
    try {
        const response = await fetch(`${API_URL}/auth/token/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            return false;
        }

        const data = await response.json();
        authStore.setToken(data.access);

        console.log('Token refreshed successfully');

        return true;
    } catch (error) {
        console.error('Token refresh error:', error);
        return false;
    }
}

export async function getMe(): Promise<void> {
    const token = authStore.getToken();

    if (!token) {
        throw new Error('No token available');
    }

    try {
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }

        const user = await response.json();
        authStore.setUser(user);
    } catch (error) {
        console.error('Get user error:', error);
        throw error;
    }
}
