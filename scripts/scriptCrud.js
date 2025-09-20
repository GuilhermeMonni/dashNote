//adicionar task
const addTask = document.querySelector('#addTask')

addTask.addEventListener(('click'), async () => {
    const { value: formValues } = await Swal.fire({
        title: "Adicionar tarefa",
        html: `
            <input type="text" id="inputValue" class="inputForm">
            <input type="date" id="inputValueDate" class="inputForm">
        `,
        focusConfirm: false,
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
})
