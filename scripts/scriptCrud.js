// add open task list 
const ulOpen = document.querySelector('#task-open')//ul open

setTimeout(() => {
    let liOpen = ulOpen.querySelectorAll('li')//list open

    liOpen.forEach((e) => {
        let btnRemTask = document.createElement('btn')//btn remove task
        btnRemTask.innerHTML = '<i class="fi fi-sr-cross"></i>'
        btnRemTask.classList.add('btnRemTask')

        e.addEventListener('mouseover', () => {
            e.appendChild(btnRemTask)
        })
        e.addEventListener('mouseout', () => {
            e.removeChild(btnRemTask)
        })
    }) 
}, 1000)

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
                
            return console.log(data)
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

