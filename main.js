const { app, BrowserWindow, ipcMain } = require('electron')
const { dialog } = require('electron')
const path = require('node:path')

const os = require("os")
const fs = require("fs")
const { PDFDocument, StandardFonts, rgb } =require(  'pdf-lib')
// const Swal = require('sweetalert2')
// console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))

var Excel = require('exceljs');

let inputFilepath ="C:\\Users\\alist\\OneDrive - Kentech Group DMCC\\Desktop\\outttttt"


let ArrayOFALLFIlePaths = []

function createWindow () {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        contextIsolation:true,
        nodeIntegration:true, 
        preload: path.join(__dirname, 'preload.js'), 
       devTools:true
      }
    })
  
    win.loadFile('index.html')
    win.webContents.openDevTools()





    ipcMain.on("openTheContinousFileDialog", async(event, args)=>{
      console.log("doa;pggggggggg");
     
    await  dialog.showOpenDialog( win, {
        title:`select the pdf file`, 
        buttonLabel :"select only pdf files", 
        filters:[{name:"pdf fiels only" , extensions : ["pdf"]}], 
        properties: ['openFile',"multiSelections"]
      }).then(result => {
        console.log(result.canceled)
        console.log(result.filePaths)

        ArrayOFALLFIlePaths.push(...result.filePaths)
        ArrayOFALLFIlePaths = Array.from(new Set(ArrayOFALLFIlePaths))
        
        win.webContents.send("checkForMoreFilePaths", ArrayOFALLFIlePaths)









      

      }).catch(err => {
        console.log(err)
      })

    
     
   
       
     })




  
  ipcMain.on('getinputfilepath',async (event, args) => {
    // console.log("event== getinputfilepath==",event);
    // console.log("args==getinputfilepath==",args);
  
 
   console.log(args);
  

   var workbook = new Excel.Workbook();

await workbook.xlsx.readFile(args.inputFilepath)
    .then(function() {
        var worksheet = workbook.getWorksheet('Sheet1');
        var cell = worksheet.getCell('A5').value;
        // console.log(cell);
  let singleFileNameArray = []
  let sinlgeArrayofPages = [ ]

  

        let last_row = worksheet.rowCount
        console.log({last_row});

        for (let i = 2; i <= last_row; i++) {
          let placeHodlerArry = []
          singleFileName.push(   worksheet.getCell('A'+i).value)
          // console.log({singleFileName});
          // console.log("worksheet.getCell('B'+i).value.includes(",")==",worksheet.getCell('B'+i).value.includes(","));

          placeHodlerArry =  worksheet.getCell('B'+i).value.includes(",")? worksheet.getCell('B'+i).value.split(","): worksheet.getCell('B'+i).value
          // console.log({placeHodlerArry});
          sinlgeArrayofPages.push(placeHodlerArry)
       


          
        }

        // console.log("ssssssssssssssssssssssssssssssssssssssssssssssssssssssssss");
        // console.log({sinlgeArrayofPages});

        for (let j = 0; j < sinlgeArrayofPages.length; j++) {
          if(Array.isArray( sinlgeArrayofPages[j])){
            for (let k = 0; k < sinlgeArrayofPages[j].length; k++) {
                if(sinlgeArrayofPages[j][k].includes("-")){
                  let lenthofPagesArr =sinlgeArrayofPages[j][k].split("-")

                  sinlgeArrayofPages[j][k] = lenthofPagesArr
                }
              
            }

           
          
            
          }
          
        }


 console.log({sinlgeArrayofPages});

        win.webContents.send("update-counter", sinlgeArrayofPages)
        // console.log("eeeeeeeeeeeeeeeeeeeeeee");
    });

    // console.log("fffffffffffffffffffffffffffffffffffffffffff");
  
  });

}




  app.whenReady().then(() => {
    createWindow()


   
     
     

  })



  const awaitedForLoop = async _ => {
    console.log('Start')
 
  //  try {
    
  //  } catch (error) {
    
  //  }
 
    for (let i = 0; i < ArrayOFALLFIlePaths.length; i++) {
      const winPreview =  new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          contextIsolation:true,
          nodeIntegration:true, 
          preload: path.join(__dirname, 'preload22.js'), 
         devTools:true
        }
      })

     
    //  dialog.showErrorBox('Title', 'Prompt text') 
  
  //  const { value: text } = await Swal.fire({
  //   input: "textarea",
  //   inputLabel: "Message",
  //   inputPlaceholder: "Type your message here...",
  //   inputAttributes: {
  //     "aria-label": "Type your message here"
  //   },
  //   showCancelButton: true
  // });
  // if (text) {
  //   Swal.fire(text);
  // }


//  await win.loadURL(url.format({
//     pathname: path.join(__dirname, 'Formpage.html'),
//     pathname: path.join(result.filePaths[i]),
//     protocol: 'file:',
//     slashes: false
// }))
//  await  winPreview.loadFile("Formpage.html")
  await   winPreview.loadFile(ArrayOFALLFIlePaths[i])
  await    winPreview.webContents.openDevTools()
      
    }
    console.log('End')


   

    const cobinedinputWindow =  new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        contextIsolation:true,
        nodeIntegration:true, 
        preload: path.join(__dirname, 'preload22.js'), 
       devTools:true
      }
    })




    await  cobinedinputWindow.loadFile("Formpage.html")
  await cobinedinputWindow.webContents.send("passLengthAndName", ArrayOFALLFIlePaths)

  await    cobinedinputWindow.webContents.openDevTools()

  }


  
  ipcMain.on("keepLoopingToGetMoreFiles", async(event, args)=>{
      console.log("calllled awaited loops");
    awaitedForLoop()
  })
  


  //////////////////////////////////////////////calling the final combining

  ipcMain.on("startCombiningALlPdfFilesFinally", async(event, args)=>{
    console.log("calling final combiner")

    // console.log(args);


 try {



  let placeHodlerArry = []


  for (let i = 0; i < args.length; i++) {
   
 
    placeHodlerArry =  args[i][1].includes(",")? placeHodlerArry.concat( args[i][1].split(",")): placeHodlerArry.concat(args[i][1])
    // console.log({placeHodlerArry});

 

    for (let j = 0; j < placeHodlerArry.length; j++) {
      if(Array.isArray( placeHodlerArry[j])){
        for (let k = 0; k < placeHodlerArry[j].length; k++) {
            if(placeHodlerArry[j][k].includes("-")){
              let lenthofPagesArr =sinlgeArrayofPages[j][k].split("-")
  
              sinlgeArrayofPages[j][k] = lenthofPagesArr
            }
          
        }
  
       
      
        
      }
      
    }

console.log(placeHodlerArry);


args[i][1]= placeHodlerArry

placeHodlerArry=[]
  }

  // console.log("ssssssssssssssssssssssssssssssssssssssssssssssssssssssssss");
  // console.log({sinlgeArrayofPages});


console.log(args);
let finalbufferArray = [ ]

for (let i = 0; i < args.length; i++) {

  
 const existingPdfBytes = await fs.readFileSync(args[i][0])
const pdfDoc = await PDFDocument.load(existingPdfBytes)
const pages = pdfDoc.getPages()

const pdfDoc2 = await PDFDocument.create()

for (let j = 0; j <args[i][1].length ; j++) {
   
    let element = args[i][1][j]
    if( args[i][1][j].includes("-")){
       let splitPageNoArr =args[i][1][j].split("-")
       console.log({splitPageNoArr});
     
           
           for (let q = splitPageNoArr[0]; q <= splitPageNoArr[1]; q++) {
            const [firstDonorPage] = await pdfDoc2.copyPages(pdfDoc, [q -1])
             console.log("q splitPageNoArr[p]", q-1 );
             await   pdfDoc2.addPage(firstDonorPage)
            
           }
            //  const [firstDonorPage] = await pdfDoc2.copyPages(pdfDoc, [splitPageNoArr[p]-1])
            //  console.log("extraator apge splitPageNoArr[p]-1", splitPageNoArr[p]-1);
            //  await   pdfDoc2.addPage(firstDonorPage)



    }else{
      const [firstDonorPage] = await pdfDoc2.copyPages(pdfDoc, [args[i][1][j]-1])
             pdfDoc2.addPage(firstDonorPage)

    }


  
  // const [firstDonorPage] = await pdfDoc2.copyPages(pdfDoc, [j])
  // pdfDoc2.addPage(firstDonorPage)

}

finalbufferArray.push([args[i][2],await pdfDoc2.save() ])



// console.log("vvvvvvvvvvvvvvvvvvvvvv");
// let inputFilepath ="C:\\Users\\alist\\OneDrive - Kentech Group DMCC\\Desktop\\outttttt"
// console.log({inputFilepath});
// // const pdfBytes = await pdfDoc2.save()
// console.log(pdfBytes);
// fs.writeFile( inputFilepath  +"//"+args[i][2]+'.pdf', await pdfDoc2.save(),(err) => {
//   if (err)
//       console.log(err);
//   else {
//       // console.log("mater file writing completed\n");
//       // console.log("The written has the following contents:");


//       // let win = new BrowserWindow({
//       //                 webPreferences: {
//       //                   plugins: true
//       //                 }
//       //               })
      
//       //               win.loadURL( direcmaster+"//"+"FINAL"+'--output.pdf')


      
//   }
//   })



}     //emd pf for loo[ abpve]

let filesForCombiningName = Array.from(new Set(finalbufferArray.map((i, index)=>i[0])))

console.log({filesForCombiningName});

// let filteredNamedArray = finalbufferArray.filter()

let combinerfileDATAArray = []
for (let n = 0; n < finalbufferArray.length; n++) {
  

  console.log("vvvvvvvvvvvvvvvvvvvvvv");

console.log({inputFilepath});
// const pdfBytes = await pdfDoc2.save()
// console.log(pdfBytes);

// const newPdf = await PDFDocument.create()

// newPdf.addPage(finalbufferArray[n][1])

if(filesForCombiningName.includes(finalbufferArray[n][0])){

  combinerfileDATAArray.push([finalbufferArray[n][0], finalbufferArray[n][1]])




}else {

  const pdfDocxx = await PDFDocument.load(finalbufferArray[n][1])


  fs.writeFile( inputFilepath  +"//"+finalbufferArray[n][0]+'.pdf', await pdfDocxx.save(),(err) => {
    if (err)
        console.log(err);
    else {
        // console.log("mater file writing completed\n");
        // console.log("The written has the following contents:");
  
  
        // let win = new BrowserWindow({
        //                 webPreferences: {
        //                   plugins: true
        //                 }
        //               })
        
        //               win.loadURL( direcmaster+"//"+"FINAL"+'--output.pdf')
  
  
        
    }
    })

}

  
}

// console.log(combinerfileDATAArray);
// } catch (error) {
// console.log(error);
// }

// }
let finalOutputObject =filesForCombiningName.reduce((acc, elem) => {
  acc[elem] = "" // or what ever object you want inside
  return acc
}, {})
console.log({finalOutputObject});
for (let a = 0; a < combinerfileDATAArray.length; a++) {
           for (let b = 0; b < filesForCombiningName.length; b++) {
                if(filesForCombiningName[b]===combinerfileDATAArray[a][0]){
                  if(finalOutputObject[filesForCombiningName[b]]===""){
                    const pdfDocumentForCOmbining = await PDFDocument.load(combinerfileDATAArray[a][1])
                    finalOutputObject[filesForCombiningName[b]] = await pdfDocumentForCOmbining.save()
                    // console.log("finalOutputObject in ----==", finalOutputObject);
                  }else{

                    const pdfDoc2 = await PDFDocument.create()
                    const pdfDocumentForCOmbiningfirst =await PDFDocument.load(finalOutputObject[filesForCombiningName[b]])
                    // console.log("filesForCombiningName[b]==",filesForCombiningName[b]);
                    // console.log("finalOutputObject[filesForCombiningName[b]]-----",finalOutputObject[filesForCombiningName[b]]);
                    // console.log({pdfDocumentForCOmbiningfirst});
                    //  console.log("when not equal   ");
                        //  console.log({pdfDocumentForCOmbiningfirst});

                    const pdfDocumentForCOmbiningsecond = await PDFDocument.load(combinerfileDATAArray[a][1])
                    // console.log({pdfDocumentForCOmbiningsecond});

              //  console.log("pdfDocumentForCOmbiningfirst.getPageCount()---",pdfDocumentForCOmbiningfirst.getPageCount());



              for (let k = 0; k < pdfDocumentForCOmbiningfirst.getPageCount(); k++) {
                const [firstDonorPage] = await pdfDoc2.copyPages(pdfDocumentForCOmbiningfirst, [k])
                // console.log({firstDonorPage});

                pdfDoc2.addPage(firstDonorPage)

                
              }
            
                    for (let q = 0; q < pdfDocumentForCOmbiningsecond.getPageCount(); q++) {
                      const [firstDonorPage] = await pdfDoc2.copyPages(pdfDocumentForCOmbiningsecond, [q])

                      // console.log({firstDonorPage});
                      pdfDoc2.addPage(firstDonorPage)
  
                      
                    }
                    // console.log("pdfDocumentForCOmbiningfirst.getPages()---",pdfDocumentForCOmbiningfirst.getPages());

                
                    finalOutputObject[filesForCombiningName[b]] = await pdfDoc2.save()

                    // console.log("saved");
                      
                  }
                 
                    
                  
                }




           }
  
}



console.log({finalOutputObject});



   for (let u = 0; u < Object.keys(finalOutputObject).length; u++) {
        
    

         const pdfDocxx = await PDFDocument.load( finalOutputObject [Object.keys(finalOutputObject)[u]])


         fs.writeFile( inputFilepath  +"//"+ Object.keys(finalOutputObject)[u]+'.pdf', await pdfDocxx.save(),(err) => {
           if (err)
               console.log(err);
           else {
               // console.log("mater file writing completed\n");
               // console.log("The written has the following contents:");
         
         
               // let win = new BrowserWindow({
               //                 webPreferences: {
               //                   plugins: true
               //                 }
               //               })
               
               //               win.loadURL( direcmaster+"//"+"FINAL"+'--output.pdf')
         
         
               
           }
           })







   }
      

//    for (let i = 0; i < args.length; i++) {


// const existingPdfBytes = await fs.readFileSync(args[i][0])
// const pdfDoc = await PDFDocument.load(existingPdfBytes)
// const pages = pdfDoc.getPages()

// const pdfDoc2 = await PDFDocument.create()


  //  }

 

 } catch (error) {
  console.log(error);
 }










})

  









  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })