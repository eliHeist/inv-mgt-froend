

export const handle = async ({ event, resolve }) => {
    const access = event.cookies.get('access_token');
    const refresh = event.cookies.get('refresh_token');

    let user = null;

    if (access) {
        user = await verifyAccessToken(access);
    }

    if (!user && refresh) {
        const newAccess = await refreshAccessToken(refresh);
        if (newAccess) {
            event.cookies.set('access_token', newAccess, { httpOnly: true, path: '/' });
            user = await verifyAccessToken(newAccess);
        }
    }

    event.locals.user = user;

    return resolve(event);
};
