var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import register from "./register.js";
import login from "./login.js";
document.addEventListener('DOMContentLoaded', () => {
    const formRegister = document.getElementById('registrationForm');
    formRegister.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const username = document.getElementById('input-username').value;
        const password = document.getElementById('input-password').value;
        const passwordConf = document.getElementById('input-passwordConf').value;
        const role = document.getElementById('input-role').value;
        if (password === passwordConf) {
            try {
                yield register(username, password, role);
            }
            catch (error) {
                console.error('Error:', error);
                alert('An error occurred during registration. Please try again.');
            }
        }
        else {
            alert('Passwords do not match');
        }
    }));
});
document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('loginForm');
    formLogin.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        if (username) {
            try {
                yield login(username, password);
                document.getElementById('login-username').value = '';
                document.getElementById('login-password').value = '';
            }
            catch (error) {
                console.error('Error:', error);
                alert('An error occurred during login. Please try again.');
            }
        }
        else {
            alert('Username or password is missing');
        }
    }));
});
