//const forecast = require("../../src/utils/forecast")

console.log('Client side javascript file is loaded')

//----Fetch is a function to be executed on javascript client side
//request is used in the backend for nodejs
//then is like the callback in request, it is a promise
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    //--this then promise is gonna run when the reponse has arrived and has been parsed
    response.json().then((data) => {
        console.log(data)
    })
})


/*fetch('http://localhost:3000/weather?address=boston').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data.location)
            console.log(data.forecast)
        }

    })
})*/

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
//messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    //it's gonna prevent the browser from being refreshed
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

        fetch('http://localhost:3000/weather?address=' + location).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent=data.location
                    messageTwo.textContent=data.forecast.weather
                    console.log(data)
                    /*console.log(data.location)
                    console.log(data.forecast)*/
                }       
            })
        })
        
})
