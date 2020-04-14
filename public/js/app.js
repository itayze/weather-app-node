console.log("javascript client side is running")




const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector("#message-1")
const messageTwo=document.querySelector("#message-2")




weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageOne.textContent='loading result...'
    const location= search.value


    fetch('http://localhost:3000/weather?adress='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            {
               
                messageTwo.textContent=data.error
            }
            else
            {
                
                messageOne.textContent='the current temperature is '+data.forecast+' and the wind speed is '+data.windSpeed

            }
            
        })
    })



    
})
