






window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const type of ['chrome', 'node', 'electron']) {
      replaceText(`${type}-version`, process.versions[type])
    }
  })



  const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
  // we can also expose variables, not just functions
})




const os = require("os")
const path = require("path")

const Toasitfy = require("toastify-js")


contextBridge.exposeInMainWorld('os', {
  homedir:() => os.homedir()

})


contextBridge.exposeInMainWorld('path', {
  join:(...args) => path.join(...args)

})


contextBridge.exposeInMainWorld('Toastify', {
  toast:(options) => Toasitfy(options).showToast()

})





contextBridge.exposeInMainWorld('ipcRenderExposingToMain', {
//  send:(channel,data)=> ipcRenderer.send(channel, data)  ,
//  on:(channel, func)=> ipcRenderer.on(channel, (event, ...args)=>func(...args))

getInputFilePathFunc:({inputFilepath})=>ipcRenderer.send("getinputfilepath", {inputFilepath}),
   
openFileDiaglogBoxInMain:()=>ipcRenderer.send("openTheContinousFileDialog"), 




resetTheForm:()=>ipcRenderer.send("resetTheFormInMainJS"), 





//form Main to redner 

onUpdateCounter: (callback) => ipcRenderer.on('update-counter', (_event, value) => callback(value))
,


chekforMoreUpatesinWinRender: (callback) => ipcRenderer.on('checkForMoreFilePaths', (_event, value) => callback(value)), 



keppLoopingInFrontend:()=>ipcRenderer.send("keepLoopingToGetMoreFiles"), 


errofoundInMainwhileCompiling: (callback) => ipcRenderer.on('errorFOundwhiel', (_event, value) => callback(value)), 


successAfterCombinding: (callback) => ipcRenderer.on('successfullyCombinedFiles', (_event, value) => callback(value)), 

updateFrontEndAboutOutPutPaths: (callback) => ipcRenderer.on('updateOutOutPathInFrontEnd', (_event, value) => callback(value)), 




})