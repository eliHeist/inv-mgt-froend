import { get } from 'svelte/store';
import { authStore } from '$lib/stores/auth';

type Permission = string;

function extractPermissions(user: App.User): Set<Permission> {
    const permissions = new Set<Permission>();

    user.c_groups?.forEach(group => {
        group.permissions?.forEach((perm:any) => permissions.add(perm.codename));
    });

    user.user_permissions?.forEach(perm => permissions.add(perm.codename));

    return permissions;
}

export function hasPermission(code: Permission): boolean {
    const { user } = get(authStore);
    if (!user) return false;

    const perms = extractPermissions(user);
    return perms.has(code);
}

export function hasAnyPermission(codes: Permission[]): boolean {
    return codes.some(code => hasPermission(code));
}

export function hasAllPermissions(codes: Permission[]): boolean {
    return codes.every(code => hasPermission(code));
}

export function isAdmin(): boolean {
    const { user } = get(authStore);
    return !!user?.profile?.admin_access;
}
