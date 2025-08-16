const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  loginSucesso: () => ipcRenderer.send('login-sucesso'),
  cadastro: () => ipcRenderer.send('cadastro')
})