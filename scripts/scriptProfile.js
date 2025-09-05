//card profile home 

//exibir o nome do usuario no card 
let nameCard = document.querySelector('#username-card') 
let usernameCard = username

usernameCard = usernameCard.charAt(0).toUpperCase() + usernameCard.slice(1)

nameCard.textContent = usernameCard

//logout do usuario
async function logout(){
    try{
        const response = await fetch('https://dashnote.onrender.com/logout', {
            method:'POST', 
            credentials: 'include'
        })
    }
    catch{
        console.error("Falha na requisição de logout:", error)
    }
    finally{
        localStorage.clear()
        window.location.href = './index.html'
    }
}