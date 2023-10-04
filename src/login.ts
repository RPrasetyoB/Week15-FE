const api_url = 'https://week11-rpb.up.railway.app' + '/v1/auth/login'

export default async function login(username : string, password : string) {
    try {
        const response = await fetch(api_url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-type' : 'application/json'
            },
            body : JSON.stringify({
                username: username,
                password: password
            })
        });
        const data = await response.json();
        
        alert(data.message);
        if(response.status === 200) {
            const encodedToken = encodeURIComponent(data.token);
            const encodedRole = encodeURIComponent(data.role);

            const tokenCookieValue = `token=${encodedToken};path=/`; 
            const roleCookieValue = `role=${encodedRole};path=/`; 

            document.cookie = tokenCookieValue;
            document.cookie = roleCookieValue;

            
                if (encodedRole === 'manager') {
                    setTimeout(() => {
                        window.location.href = '/manager.html';
                    }, 500);                
                }else if (encodedRole === 'employee') {
                    setTimeout(() => {
                        window.location.href = '/employee.html';
                    }, 500);
            } else {
                alert(data.message); 
            }
        }
    } catch (error) {
        console.error('Error:', error); 
        alert('Database connection error');
    }
}