const api_uri = 'https://week11-rpb.up.railway.app/'
const logoutBtn2 = document.getElementById('logoutBtn') as HTMLButtonElement;

function getToken2() {
    const cookies = document.cookie.split(';');
    let token = ''
    let role = ''
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'token') {
         token = value
      }
    }
    return {token, role}
  }
  
async function fetchHtml2() {
    try {
        const response = await fetch(api_uri + 'v1/tasks', { method: 'GET' });
        const getData = await response.json();
        const items = getData.data
        const taskOutput = document.getElementById('taskList') as HTMLElement;
        let dataHtml = ''
        if (items.length !== 0) {
            for (let i = 0; i < items.length; i++) {
                let statusColor = '';
                if(items[i].status == 'Done / Approved') {
                    statusColor = 'text-success'
                }else if(items[i].status == 'Need revision / Rejected' || items[i].status == 'Not started') {
                    statusColor = 'text-danger'
                }else if(items[i].status == 'In progress') {
                    statusColor = 'text-warning'
                }else if(items[i].status == 'In review') {
                    statusColor = 'text-info'
                }
                
                dataHtml += `
                <tr class="${items[i]._id}">
                    <td>${i+1}</td>
                    <td>${items[i].task}</td>
                    <td>&nbsp${items[i].createdAt.slice(0,10)}</td>
                    <td>&nbsp;${items[i].updatedAt.slice(0,10)}</td>
                    <td><span class="status ${statusColor}">&bull;</span>${items[i].status}</span></td>
                    <td>
                        <a href="#" class="settings" title="Update" data-toggle="tooltip"><i style="text-align:center;" class="material-icons btn-update" data-toggle="modal" data-target="#myModal" data-idtask="${items[i]._id}">&#xE8B8;</i></a>
                    </td>
                </tr>
                `;                
            }
        }
        
        taskOutput.innerHTML = dataHtml
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    await fetchHtml2();
});

// update task

const updateTask2 = async (updateStat : string) => {
    const token = getToken2().token
    const updateInput = (document.getElementById('inputUpdate') as HTMLInputElement).value;

    if (!updateInput || updateInput === '') {
        return alert('Update task input is empty');
    }    
    console.log(updateInput);
    
    const body = {
        status  : updateInput
    }
    const response = await fetch(api_uri + 'v1/tasks/' + updateStat, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    });
   
    fetchHtml2()
}

// log out
const logOut2 = ()=> {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/index.html';
}



// event


//modal
document.addEventListener('click', (e: MouseEvent) => {
    const el = e.target as HTMLElement;
    
    if (el.classList.contains('btn-update')) {
        const idUpdate : any = el.dataset.idtask
        const btnUpdate = document.querySelector('.btn-updated')
        btnUpdate?.setAttribute('data-idtask', idUpdate)
        
    }
})
//update
document.addEventListener('click', (e: MouseEvent) => {
    const el = e.target as HTMLElement;
    
    if (el.classList.contains('btn-updated')){
        const updateStat = el.dataset.idtask
        updateTask2(updateStat as string)
    }
})

//log out
logoutBtn2.addEventListener('click', logOut2)