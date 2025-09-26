import { PRIVATE_API_URL } from '$env/static/private';

export const POST = async ({ request }) => {
    const { email, password } = await request.json();
    console.log(email, password);

    const response = await fetch(`${PRIVATE_API_URL}/token/pair`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const setCookie = response.headers.get('Set-Cookie');

    if (!response.ok || !setCookie) {
        return new Response(JSON.stringify({ error: 'Login failed' }), {
            status: response.status
        });
    }

    // Forward the cookie to the browser
    return new Response(
        JSON.stringify({ message: 'Login successful' }),
        {
            status: 200,
            headers: {
                'Set-Cookie': setCookie
            }
        }
    );
};
