import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { authStore } from '$lib/stores/auth';
import { hasPermission, hasAnyPermission, isAdmin } from '$lib/auth/permissions';

interface GuardOptions {
    permissions?: string[];
    any?: boolean;              // allow any of the listed permissions
    adminOnly?: boolean;        // restrict to admin_access only
    allowAdminOverride?: boolean; // allow admin_access to bypass permission checks
    redirectTo?: string;
}

export async function guard(options: GuardOptions = {}) {
    const {
        permissions = [],
        any = false,
        adminOnly = false,
        allowAdminOverride = false,
        redirectTo = '/auth/login'
    } = options;

    const { token, user } = get(authStore);

    if (!token || !user) {
        throw redirect(302, redirectTo);
    }

    const admin = isAdmin();

    // Admin-only routes
    if (adminOnly && !admin) {
        throw redirect(302, '/unauthorized');
    }

    // If no permissions required, or admin-only check already passed
    if (!permissions.length) return true;

    // Allow admin override if specified
    if (allowAdminOverride && admin) return true;

    // Otherwise, perform normal permission checks
    const allowed = any
        ? hasAnyPermission(permissions)
        : permissions.every(hasPermission);

    if (!allowed) {
        throw redirect(302, '/unauthorized');
    }

    return true;
}
