const api_url = 'https://week11-rpb.up.railway.app' + '/v1/auth/register'

export default async function register(username : string, password : string, role : string) {
    try {
        const response = await fetch(api_url!, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type' : 'application/json'
            },
            body : JSON.stringify({
                username: username,
                password: password,
                role: role
            })
        });
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.log('error', error);
        alert('Database connection error')
    }
}