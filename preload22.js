const { contextBridge, ipcRenderer } = require('electron')








const { PDFDocument, StandardFonts, rgb } =require(  'pdf-lib')
const fs = require("fs")
// const existingPdfBytes = await fs.readFileSync(args[i][0])
// const pdfDoc = await PDFDocument.load(existingPdfBytes)

contextBridge.exposeInMainWorld('calcPagesInPDF', {
 
  getPagnos: async(args) => {
    const existingPdfBytes = await fs.readFileSync(args)
   const pdfDoc = await PDFDocument.load(existingPdfBytes)
   console.log(pdfDoc.getPageCount());
   return pdfDoc.getPageCount()
  }
})




contextBridge.exposeInMainWorld('ipcRenderForGettingValuesinInputBox', {
    //  send:(channel,data)=> ipcRenderer.send(channel, data)  ,
    //  on:(channel, func)=> ipcRenderer.on(channel, (event, ...args)=>func(...args))
    
    getvaluesFromInputBoxForPages:(args)=>ipcRenderer.send("getInputsFromInputBox", args),
       
    // openFileDiaglogBoxInMain:()=>ipcRenderer.send("openTheContinousFileDialog"), 
    
    
    
    
    //form Main to redner 
    
    // onUpdateCounter: (callback) => ipcRenderer.on('update-counter', (_event, value) => callback(value))

    getArrayofFilePathsInRender: async (callback) => ipcRenderer.on('passLengthAndName', (_event, value) =>  callback(value))

    // const existingPdfBytes = await fs.readFileSync(args[i][0])
    // const pdfDoc = await PDFDocument.load(existingPdfBytes)
    // const pages = pdfDoc.getPages()
    


    
    })




    contextBridge.exposeInMainWorld('passingTheLastArry', {
        //  send:(channel,data)=> ipcRenderer.send(channel, data)  ,
        //  on:(channel, func)=> ipcRenderer.on(channel, (event, ...args)=>func(...args))
        

           
        // openFileDiaglogBoxInMain:()=>ipcRenderer.send("openTheContinousFileDialog"), 
        
        
        
        
        //form Main to redner 
        
        // onUpdateCounter: (callback) => ipcRenderer.on('update-counter', (_event, value) => callback(value))
    
        transferTheFinalArrayTOMainForCombining :(masterArrayForcombning)=>ipcRenderer.send("startCombiningALlPdfFilesFinally",masterArrayForcombning),






      
        resetToTheBasefile :(masterlisttibase)=>ipcRenderer.send("resetToTheBaseInMainJS",masterlisttibase)


        
        })