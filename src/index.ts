import register from "./register.js";
import login from "./login.js";


document.addEventListener('DOMContentLoaded', () => {
    const formRegister = document.getElementById('registrationForm') as HTMLFormElement;

    formRegister.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username: string = (document.getElementById('input-username') as HTMLInputElement).value;
        const password: string = (document.getElementById('input-password') as HTMLInputElement).value;
        const passwordConf: string = (document.getElementById('input-passwordConf') as HTMLInputElement).value;
        const role: string = (document.getElementById('input-role') as HTMLInputElement).value;


        if (password === passwordConf) {
            try {
                await register(username, password, role); 
            } catch (error) {
                console.error('Error:', error); 
                alert('An error occurred during registration. Please try again.'); 
            }
        } else {
            alert('Passwords do not match');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('loginForm') as HTMLFormElement;

    formLogin.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username: string = (document.getElementById('login-username') as HTMLInputElement).value;
        const password: string = (document.getElementById('login-password') as HTMLInputElement).value;

        if (username) {
            try {
                await login(username, password);
                (document.getElementById('login-username') as HTMLInputElement).value='';
                (document.getElementById('login-password') as HTMLInputElement).value='';
            } catch (error) {
                console.error('Error:', error); 
                alert('An error occurred during login. Please try again.'); 
            }
        } else {
            alert('Username or password is missing');
        }
    });
});
