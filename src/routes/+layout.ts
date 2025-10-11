import { authStore } from '$lib/stores/auth';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const ssr = false;

export const load: LayoutLoad = async ({ url }:{url:any}) => {
    let token: string | null = null;
    let user: any = null;

    authStore.subscribe((state) => {
        token = state.token;
        user = state.user;
    })();

    const publicPaths = ['/login'];
    const isPublicPath = publicPaths.includes(url.pathname);

    if (!isPublicPath && !token) {
        throw redirect(302, '/login');
    }

    if (url.pathname === '/admin' && (!user || !user.is_company_admin)) {
        throw redirect(302, '/dashboard');
    }

    if (url.pathname === '/' && token) {
        throw redirect(302, '/dashboard');
    }

    if (url.pathname === '/login' && token) {
        throw redirect(302, '/dashboard');
    }

    return {};
};
