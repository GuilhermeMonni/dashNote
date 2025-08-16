import { Store } from './electron/store'

const store = new Store()
const form = document.querySelector('#formContainer') //formulario

//eventos para verificar login
form.addEventListener('submit', execLogin)
form.addEventListener('keyup', (e) => {
    if(e.type === "Enter"){
        execLogin()
    }
})

async function execLogin(e){ //função para executar login
    e.preventDefault()

    console.log("verificando os dados inseridos...")

    const dados = new FormData(form) //dados do formulario
    const username = dados.get('username')
    const password = dados.get('password')

    try{ //api de conexao
        const response = await fetch('https://dashnote.onrender.com/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //infos json para login
                username,
                password
            })
        })

        const result = await response.json()
        console.log('Resposta servidor:', result)
        
        window.location.href = './home.html'
        
        const data = await response.json()
        store.set('token', data.token)

    }catch(error){
        console.error('Erro ao fazer o login!', error)
        alert("Usuário ou senha incorreta!")
        setTimeout(() => {
            location.reload()
        }, 2000)
    } 
}

