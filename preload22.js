const { contextBridge, ipcRenderer } = require('electron')












contextBridge.exposeInMainWorld('ipcRenderForGettingValuesinInputBox', {
    //  send:(channel,data)=> ipcRenderer.send(channel, data)  ,
    //  on:(channel, func)=> ipcRenderer.on(channel, (event, ...args)=>func(...args))
    
    getvaluesFromInputBoxForPages:(args)=>ipcRenderer.send("getInputsFromInputBox", args),
       
    // openFileDiaglogBoxInMain:()=>ipcRenderer.send("openTheContinousFileDialog"), 
    
    
    
    
    //form Main to redner 
    
    // onUpdateCounter: (callback) => ipcRenderer.on('update-counter', (_event, value) => callback(value))

    getArrayofFilePathsInRender: async (callback) => ipcRenderer.on('passLengthAndName', (_event, value) =>  callback(value))
    
    })




    contextBridge.exposeInMainWorld('passingTheLastArry', {
        //  send:(channel,data)=> ipcRenderer.send(channel, data)  ,
        //  on:(channel, func)=> ipcRenderer.on(channel, (event, ...args)=>func(...args))
        

           
        // openFileDiaglogBoxInMain:()=>ipcRenderer.send("openTheContinousFileDialog"), 
        
        
        
        
        //form Main to redner 
        
        // onUpdateCounter: (callback) => ipcRenderer.on('update-counter', (_event, value) => callback(value))
    
        transferTheFinalArrayTOMainForCombining :(masterArrayForcombning)=>ipcRenderer.send("startCombiningALlPdfFilesFinally",masterArrayForcombning),

        
        })