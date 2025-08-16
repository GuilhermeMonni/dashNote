const token = store.get('token')

fetch('https://dashnote.onrender.com/me', { 
    headers:{
        Authorization: `Bearer ${token}`
    }
})
.then(res => { //validacao user 
    console.log(res)

    if(!res.ok){
        window.location.href = './login.html'
    }
})

//buscar tasks do usuario
console.log(user.id)

