// add open task list 
const ulOpen = document.querySelector('#task-open')//ul open

setTimeout(() => {
    let liOpen = ulOpen.querySelectorAll('li')//list open
    liOpen.forEach((e) => {
        let btnRemTask = document.createElement('button') //btn delete task
        btnRemTask.classList.add('btnRemTask')
        btnRemTask.innerHTML = '<i class="fi fi-sr-cross"></i>'
        e.appendChild(btnRemTask) //btn remove task
            
        let btnEditTask = document.createElement('button')//btn edit task
        btnEditTask.classList.add('btnEditTask') 
        btnEditTask.innerHTML = '<i class="fi fi-sr-pencil"></i>'
        e.appendChild(btnEditTask) // btn edit task

        //mouse events
        e.addEventListener('mouseenter', () => {
            btnRemTask.style.display = 'block'
            btnEditTask.style.display = 'block'
        })
        
        e.addEventListener('mouseleave', () => {
            btnRemTask.style.display = 'none'
            btnEditTask.style.display = 'none'
        })

        //events click
        btnRemTask.addEventListener('click', async () => {
            const url = `https://dashnote.onrender.com/deleteTask/${e.id}`
                try{
                    const res = await fetch(url, {
                        method: 'DELETE'
                    })
                    .then((res) => {
                        console.log(`Tarefa ${e.id} deletada`) 

                        return window.location.reload()
                    })
                } catch(err){
                    console.error('Erro ao deletar tarefa!', err)
                }
        })

        btnEditTask.addEventListener('click', () => {
            console.log('editar: ', e.textContent)
        })

    }) 
}, 1100)

//adicionar task
const addTask = document.querySelector('#addTask')//btn addTask

addTask.addEventListener(('click'), async () => {//add task
    await Swal.fire({
        title: "Adicionar tarefa",
        html: `
            <button class="btn-exit" onclick="btnExit()"><i class="fi fi-br-cross"></i></button>
    
            <div class="form-infos">
                <label for="inputTask" class="labelInput">Tarefa</label>
                <input id="inputTask" class="inputValue" placeholder="Digite a tarefa a ser realizada">
            </div>

            <div class="form-infos">
                <label for="inputDate" class="labelInput">Prazo</label>
                <input id="inputDate" type="date" class="inputValue">
            </div>
        `,
        focusConfirm: true,
        text: 'Sua tarefa foi adicionada com sucesso',
        showCancelButton: true,
        confirmButtonColor: '#4CAF50', // botão confirmar
        confirmButtonText: 'Enviar',
        cancelButtonText: 'Cancelar',
        customClass: {
            popup: 'pop-up',
            title: 'title',
            confirmButton: 'btn-confirm',
            cancelButton: 'btn-exit'
        },
        preConfirm: async () => {
            const inputTask = document.getElementById("inputTask").value
            const inputDate = document.getElementById("inputDate").value
            
            if(!inputTask){
                console.error('Insira uma tarefa!')
                 //criar animação e regarregar pag
            }
            if(!inputDate){
                console.error('Defina um prazo para a tarefa!')
            }

            return await sendTask(inputTask, inputDate)
        }
    })

    async function sendTask(inputTask, inputDate){//envia task
        fetch('https://dashnote.onrender.com/addTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                task_userid: localStorage.getItem('id'), //id user
                task_task: inputTask, //task user
                task_date: inputDate, // date task
                task_state: 'open' //state task
            })
        })
        .then(async (res) => {
            const data = await res.json()
            console.log(data)    

            return window.location.reload()
        })
        .catch(error => {
            console.error('Falha ao adicionar tarefa!', error)
        })
    }
})

//btn exit popup
function btnExit(){
    Swal.close()
}

