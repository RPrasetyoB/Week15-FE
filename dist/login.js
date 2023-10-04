var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const api_url = 'https://week11-rpb.up.railway.app' + '/v1/auth/login';
export default function login(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(api_url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            const data = yield response.json();
            alert(data.message);
            if (response.status === 200) {
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
                }
                else if (encodedRole === 'employee') {
                    setTimeout(() => {
                        window.location.href = '/employee.html';
                    }, 500);
                }
                else {
                    alert(data.message);
                }
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert('Database connection error');
        }
    });
}
