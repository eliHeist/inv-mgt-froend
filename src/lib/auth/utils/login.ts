export const login = async (email: string, password: string) => {
    let message = ''
    try {
        const request = await fetch(`/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        if (request.ok) {
            return await request.json();
        } else {
            console.error('Login failed with status:', request.status);
            
            if (request.status === 401) {
                console.error('Invalid credentials');
                message = 'Invalid email or password';
            }
            return {
                status: request.status,
                message: message
            };
        }
    } catch (error) {
        console.error('Error during login:', error);
        message = (error as Error).message;
        return {
            status: null,
            message: message
        };
    }
};