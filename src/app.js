const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app =  express()
const getCodeApi = require('./utils/geoCode')
const e = require('express')
const { callbackify } = require('util')


//Define paths for express config
const publicIndex = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partalsPath = path.join(__dirname, '../templates/partials')
const dia = new Date()

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partalsPath)

//Setup static directory to server
app.use(express.static(publicIndex))

app.get('',(req,res)=> {
    res.render('index', {
        title:'Weather App',
        name:'Welcome',
        author:'Author: Valber Martins',
        email:'firstpalace@gmail.com'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title:'About Us',
        CompanyName:'First Palace',
        year: dia.getFullYear(),
        author:'Author: Valber Martins',
        email:'firstpalace@gmail.com'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'HELP',
        author:'Author: Valber Martins',
        email:'firstpalace@gmail.com'
    })
})

// app.get(helpPage, (req, res) => {
//     res.send({
//         name: 'Rosangela',
//         age: 40
//     })
// })

// app.get('/about',(req, res) => {
//     res.send('This is the about page')
// })

app.get('/weather', (req, res) =>{
    var address = req.query.address

    if(!req.query.address){
        return res.send({
            error:'Please type a address'
        })
    }else{
       getCodeApi.geoCode(address, (error, data) => {
           if(error){
             return res.send({
                  error: error
              })
            }

            getCodeApi.forecast(data.lati, data.longi, (error, forecastt) => {
                if(error){
                    return console.log(error)
                }
                
                res.send({
                     forecast: forecastt,
                     location: data.loca,
                     address: address,
                     main: forecastt,
                     descri: forecastt.desc
                })

                //console.log('The weather in ' + data.loca + ' is ' + forecastt.main + ' is ' + forecastt.descri )  
            })
             
       })
    }

})

app.get('/products',(req, res) =>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title:'Weather App',
        erroMenssage:'Forms to help is not avalible'
    })
})

app.get('*',(req,res) => {
    res.render('404', {
        title:'Weather App',
        erroMenssage:'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server us up on port 3000.')
})