//adicionar task
const addTask = document.querySelector('#addTask')//btn addTask

// addTask.addEventListener(('click'), async 
// () => {
    async function loadPag(){
    const { value: formValues } = await Swal.fire({
        title: "Adicionar tarefa",
        html: `
            <button class="btn-exit"></button>
    
            <div class="form-infos">
                <label for="inputTask" class="labelInput">Tarefa</label>
                <input id="inputTask" class="inputValue" placeholder="Digite a tarefa a ser realizada">
            </div>

            <div class="form-infos">
                <label for="inputDate" class="labelInput">Prazo</label>
                <input id="inputDate" type="date" class="inputValue">
            </div>
        `,
        focusConfirm: false,
        customClass: {
            popup: 'pop-up',
            title: 'title'
        },
        text: 'Sua tarefa foi adicionada com sucesso',
        confirmButtonColor: '#4CAF50', // botão confirmar
        preConfirm: () => {
            return [
            document.getElementById("swal-input1").value,
            document.getElementById("swal-input2").value
            ];
        }
        });
        if (formValues) {
        Swal.fire(JSON.stringify(formValues));
    }
}//)

