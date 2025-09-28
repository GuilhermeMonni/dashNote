//adicionar task
const addTask = document.querySelector('#addTask')//btn addTask

// addTask.addEventListener(('click'), async 
// () => {
    async function loadPag(){
    const { value: formValues } = await Swal.fire({
        title: "Adicionar tarefa",
        html: `
            <button class="btn-exit" onclick="btnExit()"></button>
    
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
        customClass: {
            popup: 'pop-up',
            title: 'title'
        },
        text: 'Sua tarefa foi adicionada com sucesso',
        confirmButtonColor: '#4CAF50', // botão confirmar
        preConfirm: () => {
            const inputValue = document.getElementById("inputTask").value
            const inputDate = document.getElementById("inputDate").value
            
            if(!inputValue){
                console.error('Insira uma tarefa!')
            }
            if(!inputDate){
                console.error('Defina um prazo para a tarefa!')
            }

            return { inputValue, inputDate }
        }
        });
        if (formValues) {
        Swal.fire(JSON.stringify(formValues));
    }
}//)

//btn exit popup
function btnExit(){
    Swal.close()
}

