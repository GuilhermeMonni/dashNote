const token = localStorage.getItem('token') //token user
const username = localStorage.getItem('username') //username 
const id = localStorage.getItem('id') //id do user 

if(!token){window.location.href = './login.html'} //redireciona se nao tiver token

fetch('https://dashnote.onrender.com/me', { //api para protecao de rota (mantem logado) 
    headers:{
        Authorization: `Bearer ${token}`
    }
})
.then(res => { //validacao user
    if(!res.ok){
        window.location.href = './login.html'
    }

    searchTasks(username, id)
})

async function searchTasks(username, id){ //buscar tasks do user
    const response = await fetch('https://dashnote.onrender.com/task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            username,
            id
        })
    })

    // Verifica a resposta
    if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`)
    }

    const data = await response.json()
    console.log(data.message) //msg boas vindas

    //organizar tasks recebidas
    const tasksArray = Array.from(data.tasksArray) //tasks user

    const taskOpen = document.querySelector('#task-open') //ul tasks abertas
    const taskWorking = document.querySelector('#task-working') //ul tasks em andamento
    const taskFinish = document.querySelector('#task-finish') //ul tasks finalizadas

    tasksArray.forEach((e) => {
        //tasks a fazer
        if(e.state == 'open'){
            const task = document.createElement('li')
            task.classList.add('task-li') //element li task
            task.textContent = e.task

            taskOpen.appendChild(task) //add element list
            return
        }
        //tasks em andamento
        if(e.state == 'working'){
            const task = document.createElement('li')
            task.classList.add('task-li')
            task.textContent = e.tasks

            taskWorking.appendChild(task)
            return
        }
        //tasks concluidas
        if(e.state == 'finish'){
            const task = document.createElement('li')
            task.classList.add('task-li') //element li task
            task.textContent = e.tasks

            taskFinish.appendChild(task) //add element list
            return
        }
    })
}
