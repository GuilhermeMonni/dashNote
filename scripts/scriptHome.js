const token = localStorage.getItem('token')

if(!token){window.location.href = './login.html'}

fetch('https://dashnote.onrender.com/me', { //ajustar essa api para retornar o user e o id 
    headers:{
        Authorization: `Bearer ${token}`
    }
})
.then(res => { //validacao user
    if(!res.ok){
        window.location.href = './login.html'
    }
})

async function searchTaks(){
    
}

