const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'ruk zara load hone da'
    messageTwo.textContent=""
    messageThree.textContent=""
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
        }
        else{
            messageOne.textContent = "keval apni location dekhiyo kissi ladki ki nhi  "+ data.location
            messageTwo.textContent = data.forecast
            messageThree.textContent = "tapmaan dekh bhi liya bahot tez hora hai!!!"
        }
    })
})
})