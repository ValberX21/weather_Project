console.log('Client side javascript file is loaded !')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageData =  document.querySelector('#weatherData')
const messageErro =  document.querySelector('#weatherErro')

weatherForm.addEventListener('submit', (e)  => {
    e.preventDefault()

    const location = search.value
    messageData.textContent = ''
    messageErro.textContent = ''

    messageData.textContent = ' Loading...'

        fetch('/weather?address=' + location).then((response) =>{
            response.json().then((data) => {
               if(data.error){
                   messageErro.textContent = data.error
                   messageData.textContent = ''
               }else{
                messageData.textContent = 'The weather in ' + data.address 
                                                   + ' is ' + data.forecast.main 
                                                   + ' with ' + data.forecast.descri 
                                                   + ' and ' +  data.forecast.temp
                                                   + 'C˚'
                messageErro.textContent = ''
               }
            })
        })
    })




