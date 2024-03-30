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
        duraation:5000,
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