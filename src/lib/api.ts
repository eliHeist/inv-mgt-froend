import { authStore } from './stores/auth';
import { refreshToken } from './auth';
import { goto } from '$app/navigation';
import { PUBLIC_API_URL } from "$env/static/public";

const API_URL = PUBLIC_API_URL;

export async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    let token = authStore.getToken();

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    let response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
        credentials: 'include',
    });

    if (response.status === 401) {
        const refreshSuccess = await refreshToken();

        if (refreshSuccess) {
            token = authStore.getToken();
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            response = await fetch(`${API_URL}${endpoint}`, {
                ...options,
                headers,
                credentials: 'include',
            });
        } else {
            authStore.clear();
            goto('/login');
            throw new Error('Authentication failed');
        }
    }

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return response.json();
}
