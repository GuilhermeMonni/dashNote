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
    console.log(data)

    //A FAZER: organizar tasks recebidas (err 500)
}
