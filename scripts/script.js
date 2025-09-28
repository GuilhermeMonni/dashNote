const form = document.querySelector('#formContainer') //formulario
let token

//eventos para verificar login
form.addEventListener('submit', execLogin)
form.addEventListener('keyup', (e) => {
    if(e.type === "Enter"){
        execLogin()
    }
})

async function execLogin(e){ //função para executar login
    e.preventDefault()

    console.log("Verificando os dados inseridos.")

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
            body: JSON.stringify({
                username,
                password
            })
        })

        // Verifica a resposta
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`)
        }

        const data = await response.json()
        console.log('Resposta do servidor:', data)

        // Salva infos do user e redireciona
        localStorage.setItem('token', data.token)
        localStorage.setItem('username', data.username)
        localStorage.setItem('id', data.id)

        window.location.href = './home.html'

    } catch (error) {
        console.error('Erro ao fazer o login!')
        alert("Usuário ou senha incorretos!")
        setTimeout(() => {
            location.reload()
        }, 2000)
        return
    }
}
