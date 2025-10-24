import { guard } from '$lib/auth/route-guard';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
    await guard({ adminOnly: true });
    
    return {
        appTitle: 'DotSales Dashboard',
        theme: 'light',
    };
};
