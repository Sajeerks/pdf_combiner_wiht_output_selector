const { app, BrowserWindow, ipcMain } = require('electron')

const path = require('node:path')



var Excel = require('exceljs');





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

  
  ipcMain.on('getinputfilepath',async (event, args) => {
    // console.log("event== getinputfilepath==",event);
    // console.log("args==getinputfilepath==",args);
  
 
   console.log(args);
  

   var workbook = new Excel.Workbook();

await workbook.xlsx.readFile(args.inputFilepath)
    .then(function() {
        var worksheet = workbook.getWorksheet('Sheet1');
        var cell = worksheet.getCell('A5').value;
        console.log(cell);


        let last_row = worksheet.rowCount
        console.log({last_row});

        

        win.webContents.send("update-counter", cell)
        // console.log("eeeeeeeeeeeeeeeeeeeeeee");
    });

    // console.log("fffffffffffffffffffffffffffffffffffffffffff");
  
  });

}




  app.whenReady().then(() => {
    createWindow()
  })




  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })