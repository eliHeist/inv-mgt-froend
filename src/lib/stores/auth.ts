import { writable, get } from "svelte/store";
import { PUBLIC_API_URL } from '$env/static/public';

export interface User {
    company: {
        id: 0,
        name: string,
        address: string,
        contact: string
    },
    accessible_branches: [],
    profile: {
        first_name: string,
        middle_name: string,
        last_name: string,
        gender: string,
        phone_1: string,
        phone_2: string
    },
    id: 0,
    email: string,
    username: string,
    is_company_admin: boolean
}

export interface LoginResponse {
    access: string;
    user: User;
}

export const access = writable<string | null>(null);
export const user = writable<User | null>(null);

export async function login(email: string, password: string): Promise<LoginResponse> {
    const res = await fetch(`${PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // to set httpOnly refresh cookie
        body: JSON.stringify({ email, password }),
    });

    console.log(res);
    if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { detail?: string };
        console.log(err);
        throw new Error(err.detail || "Login failed");
    }

    const data = (await res.json()) as LoginResponse;
    access.set(data.access);
    user.set(data.user);
    return data;
}

export async function refresh(): Promise<boolean> {
    const res = await fetch(`${PUBLIC_API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
    });

    if (!res.ok) return false;
    const data = (await res.json()) as LoginResponse;
    access.set(data.access);
    user.set(data.user);
    return true;
}

export function logoutLocal(): void {
    access.set(null);
    user.set(null);
}

export async function apiFetch<T = any>(input: RequestInfo, init: RequestInit = {}): Promise<Response> {
    const token = get(access);
    const headers: HeadersInit = init.headers ? new Headers(init.headers) : new Headers();

    if (token) headers.set("Authorization", `Bearer ${token}`);
    init.headers = headers;

    let res = await fetch(input, { ...init, credentials: "include" });

    if (res.status === 401) {
        const ok = await refresh();
        if (!ok) {
            logoutLocal();
            throw new Error("Not authenticated");
        }
        const newToken = get(access);
        if (newToken) {
            headers.set("Authorization", `Bearer ${newToken}`);
            init.headers = headers;
        }
        res = await fetch(input, { ...init, credentials: "include" });
    }

    return res;
}
