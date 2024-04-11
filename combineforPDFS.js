const combinerbtnIpnut = document.getElementById("combinerbtn")
const counter = document.getElementById("counter")





combinerbtnIpnut.addEventListener("change",async (e)=>{
    // console.log(e);

    if(! e.target.files[0]) return 
    // console.log("e.target.files--", e.target.files[0]);
const firstExelFile = await e.target.files[0]


// console.log({firstExelFile});
// console.log(firstExelFile.path);

alertSuccess("file chooosedn="+  firstExelFile.path )

    // console.log("cleddddddddddddd");

     window.ipcRenderExposingToMain.getInputFilePathFunc( {inputFilepath:firstExelFile.path})
})



// console.log(window.  ipcRenderExposingToMain);





// console.log(versions.node());


function alertError(message){

    Toastify.toast({
        text:message,
        duraation:5000,
        close:false,
        style:{
            background:"red",
            color:"white",
            textAlign:"center"

        }
    })

}


function alertSuccess(message){

    Toastify.toast({
        text:message,
        duraation:15000,
        close:false,
        style:{
            background:"green",
            color:"white",
            textAlign:"center"

        }
    })

}



window.ipcRenderExposingToMain.onUpdateCounter((value) => {
    console.log("valeeeeeeeee======" , value);
    const oldValue = Number(counter.innerText)
    const newValue = oldValue + value
    counter.innerText = newValue.toString()
    // window.electronAPI.counterValue(newValue)
  })


  const openDiaglogBoxbtn = document.getElementById("openDiaglogBoxbtn")

  openDiaglogBoxbtn.addEventListener("click", ()=>{


    window.ipcRenderExposingToMain.openFileDiaglogBoxInMain( )

  })


  const checkforMoreFilePathsButtom = document.getElementById("checkforMoreFilePathsButtom")

  checkforMoreFilePathsButtom.addEventListener("click", ()=>{
    // window.ipcRenderExposingToMain.openFileDiaglogBoxInMain( )


  window.ipcRenderExposingToMain.keppLoopingInFrontend( )


  

    

  })




  const fileLister = document.getElementById("fileLister")
  window.ipcRenderExposingToMain.chekforMoreUpatesinWinRender( (value)=>{
    console.log("valeeeeeeeee======" , value);
    while (fileLister.firstChild) {
        fileLister.removeChild(fileLister.firstChild);
      }

    for (let i = 0; i < value.length; i++) {
        let li = document.createElement("li")
        li.innerText =  value[i];
        fileLister.appendChild(li)
        
    }
   


    

  })


  const Reset_Button = document.getElementById("Reset_Button")


  Reset_Button.addEventListener('click', ()=>{


    
    window.ipcRenderExposingToMain.resetTheForm( )
  })


  


  window.ipcRenderExposingToMain.errofoundInMainwhileCompiling( (value)=>{
    console.log("valeeeeeeeee======" , value);
      alertError(value.message)

    

  })


  window.ipcRenderExposingToMain.successAfterCombinding( (value)=>{
    console.log("valeeeeeeeee======" , value);
    //   alertSuccess(`files no nos ${Object.keys(value)} is completwed`)
alertSuccess(` ${value} no of file combined`)
    

  })
