const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`)
})

let loginWindow
let cadastroWindow
let homeWindow

const createLoginWindow = () => {
    //janela de login
    loginWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'scripts/preload.js')
        }
    })

    //loginWindow.setMenu(null)
    loginWindow.loadFile('index.html')
}

const createCadastroWindow = () => {
    //janela de cadastro
    cadastroWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'scripts/preload.js')
        }
    })

    cadastroWindow.setMenu(null)
    cadastroWindow.loadFile('cadastro.html')
}

const createHomeWindow = () => {
    //janela da home 
    homeWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'scripts/preload.js')
        }
    })

    homeWindow.setMenu(null)
    homeWindow.loadFile('home.html') 
}

app.whenReady().then(() => {
    createLoginWindow()

    ipcMain.on('cadastro', () => {
        loginWindow.close()
        createCadastroWindow()
    })

    ipcMain.on('login-sucesso', () => {
        loginWindow.close()
        createHomeWindow()
    }) 
})