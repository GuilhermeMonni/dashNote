fetch('https://dashnote.onrender.com/me', { 
    method: 'GET',
    credentials: 'include'
})
.then(res => { //validacao user 
    console.log(res)

    if(!res.ok){
        window.location.href = './login.html'
    }
})

//buscar tasks do usuario
console.log(user.id)

