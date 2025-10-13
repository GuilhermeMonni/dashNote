const token = localStorage.getItem('token') //token user

if(!token){window.location.href = './login.html'} //redireciona se nao tiver token

fetch('https://dashnote.onrender.com/me', { //api para protecao de rota (mantem logado) 
    headers:{
        Authorization: `Bearer ${token}`
    }
})
.then(async res => { //validacao user
    if(!res.ok){
        window.location.href = './login.html'
    }
    const username = localStorage.getItem('username') //username 
    const id = localStorage.getItem('id') //id do user 

    return await searchTasks(username, id)
})

async function searchTasks(username, id) {
    try{
        const resTask = await fetch('https://dashnote.onrender.com/task', {
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

        if(!resTask.ok){
            throw new Error('Erro na requisição.')
        }

        const data = await resTask.json()

        //organizar tasks recebidas
        const tasksArray = Array.from(data.tasksArray) //tasks user

        const taskOpen = document.querySelector('#task-open') //ul tasks abertas
        const taskWorking = document.querySelector('#task-working') //ul tasks em andamento
        const taskFinish = document.querySelector('#task-finish') //ul tasks finalizadas

        tasksArray.forEach((e) => {
            //tasks a fazer
            if(e.task_state == 'open'){
                const task = document.createElement('li')
                task.classList.add('task-li') //element li task
                task.textContent = e.task_task
                task.id = e.task_id //task id

                taskOpen.appendChild(task) //add element list
            }
            //tasks em andamento
            if(e.task_state == 'working'){
                const task = document.createElement('li')
                task.classList.add('task-li')
                task.textContent = e.task_task

                taskWorking.appendChild(task)
                return
            }
            //tasks concluidas
            if(e.task_state == 'finish'){
                const task = document.createElement('li')
                task.classList.add('task-li') //element li task
                task.textContent = e.task_task

                taskFinish.appendChild(task) //add element list
                return
            }
        })
    }catch(error){
        return res.json({ 
            success: false, 
            message: "Erro interno do servidor." 
        })
    }
}
