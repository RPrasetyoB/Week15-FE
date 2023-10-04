"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const api_uri = 'https://week11-rpb.up.railway.app/';
const logoutBtn2 = document.getElementById('logoutBtn');
function getToken2() {
    const cookies = document.cookie.split(';');
    let token = '';
    let role = '';
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'token') {
            token = value;
        }
    }
    return { token, role };
}
function fetchHtml2() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(api_uri + 'v1/tasks', { method: 'GET' });
            const getData = yield response.json();
            const items = getData.data;
            const taskOutput = document.getElementById('taskList');
            let dataHtml = '';
            if (items.length !== 0) {
                for (let i = 0; i < items.length; i++) {
                    let statusColor = '';
                    if (items[i].status == 'Done / Approved') {
                        statusColor = 'text-success';
                    }
                    else if (items[i].status == 'Need revision / Rejected' || items[i].status == 'Not started') {
                        statusColor = 'text-danger';
                    }
                    else if (items[i].status == 'In progress') {
                        statusColor = 'text-warning';
                    }
                    else if (items[i].status == 'In review') {
                        statusColor = 'text-info';
                    }
                    dataHtml += `
                <tr class="${items[i]._id}">
                    <td>${i + 1}</td>
                    <td>${items[i].task}</td>
                    <td>&nbsp${items[i].createdAt.slice(0, 10)}</td>
                    <td>&nbsp;${items[i].updatedAt.slice(0, 10)}</td>
                    <td><span class="status ${statusColor}">&bull;</span>${items[i].status}</span></td>
                    <td>
                        <a href="#" class="settings" title="Update" data-toggle="tooltip"><i style="text-align:center;" class="material-icons btn-update" data-toggle="modal" data-target="#myModal" data-idtask="${items[i]._id}">&#xE8B8;</i></a>
                    </td>
                </tr>
                `;
                }
            }
            taskOutput.innerHTML = dataHtml;
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    });
}
document.addEventListener('DOMContentLoaded', function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetchHtml2();
    });
});
// update task
const updateTask2 = (updateStat) => __awaiter(void 0, void 0, void 0, function* () {
    const token = getToken2().token;
    const updateInput = document.getElementById('inputUpdate').value;
    if (!updateInput || updateInput === '') {
        return alert('Update task input is empty');
    }
    console.log(updateInput);
    const body = {
        status: updateInput
    };
    const response = yield fetch(api_uri + 'v1/tasks/' + updateStat, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    });
    fetchHtml2();
});
// log out
const logOut2 = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/index.html';
};
// event
//modal
document.addEventListener('click', (e) => {
    const el = e.target;
    if (el.classList.contains('btn-update')) {
        const idUpdate = el.dataset.idtask;
        const btnUpdate = document.querySelector('.btn-updated');
        btnUpdate === null || btnUpdate === void 0 ? void 0 : btnUpdate.setAttribute('data-idtask', idUpdate);
    }
});
//update
document.addEventListener('click', (e) => {
    const el = e.target;
    if (el.classList.contains('btn-updated')) {
        const updateStat = el.dataset.idtask;
        updateTask2(updateStat);
    }
});
//log out
logoutBtn2.addEventListener('click', logOut2);
