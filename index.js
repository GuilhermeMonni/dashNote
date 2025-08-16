import {app, BrowserWindow, ipcMain} from 'electron'
import { fileURLToPath } from 'url'
import path from 'path'
import { createRequire } from 'module'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const require = createRequire(import.meta.url)
const electronReload = require('electron-reload')

electronReload(__dirname, {
  electron: require(path.join(__dirname, 'node_modules', 'electron'))
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
            preload: path.join(__dirname, 'scripts/preload.cjs')
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
            preload: path.join(__dirname, 'scripts/preload.cjs')
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
            preload: path.join(__dirname, 'scripts/preload.cjs')
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