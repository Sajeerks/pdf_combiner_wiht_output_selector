

// const inputFirst = document.getElementById("inputFirst")
const arranger_div = document.getElementById("arranger_div")
const MastercombineFilesButtom = document.getElementById("MastercombineFilesButtom")
const createdForm = document.getElementById("createdForm")






// inputFirst.addEventListener("change", (e)=>{
//     console.log(e.target.value);
// })

let masterArrayForCombining = []


window.ipcRenderForGettingValuesinInputBox.getArrayofFilePathsInRender ( async (value) => {
    console.log("valeeeeeeeee======" , value);

      for (let i = 0; i < value.length; i++) {

    
   let lastPageNo  = await window.calcPagesInPDF.getPagnos(value[i])
       
       let createdinput =     document.createElement("input")
       createdinput.setAttribute("id", `inputPageNoID-${i}`)
       createdinput.setAttribute("data-empid" , value[i])

       createdinput.setAttribute("value", "1-"+lastPageNo)
       let createdbutton =     document.createElement("button")
       createdbutton.innerText = `extract-button${i}`
       createdbutton.setAttribute("id",`extractorbtn-${i}`)
       let createdSpan =     document.createElement("span")
       createdSpan.innerText = value[i]



       let combinerInput =     document.createElement("input")
       combinerInput.setAttribute("id", `combiner-${i}`)
    
       combinerInput.setAttribute("data-comb" , value[i])
   
       combinerInput.setAttribute("placeholder", "enter the combinefileName")



       let createdHr =     document.createElement("hr")
       createdForm.appendChild(createdHr)
       createdForm.appendChild(createdinput)
       createdForm.appendChild(combinerInput)
    //    createdForm.appendChild(createdbutton)
       createdForm.appendChild(createdSpan)
     


      
        

      }
      arranger_div.appendChild(createdForm)
    
  })



  createdForm.addEventListener("submit" , async (e)=>{ 
    masterArrayForCombining =[]
    e.preventDefault()
    const allPageInputs =  document.querySelectorAll("input[data-empid]");
        console.log({allPageInputs});

        allPageInputs.forEach(singleInput=>{
            console.log("singleInput.dataset--",singleInput.dataset);

            console.log("singleInput.dataset.empid--",singleInput.dataset.empid);
            masterArrayForCombining.push([singleInput.dataset.empid, 
                singleInput.value,

            ])
        })
          
        const allcombinerInputs = await document.querySelectorAll("input[data-comb]");
        console.log({allcombinerInputs});

        allcombinerInputs.forEach(async (singleInputCombiner, index)=>{
            console.log("singleInputCombiner.dataset--",singleInputCombiner.dataset);

            console.log("singleInputCombiner.dataset.comb--",singleInputCombiner.dataset.comb);
        //    await   masterArrayForCombining.push([singleInputCombiner.dataset.comb, 
        //         singleInputCombiner.value,

        //     ])

         await masterArrayForCombining[index].push(singleInputCombiner.value)
        })






        console.log({masterArrayForCombining});









window.passingTheLastArry.transferTheFinalArrayTOMainForCombining(masterArrayForCombining)








  })

  const resetTotheFrontpage = document.getElementById("resetTotheFrontpage")


  resetTotheFrontpage.addEventListener('click', ()=>{


    
 

    window.passingTheLastArry.resetToTheBasefile("this is thd data send to main js form samplerjs ")

  })