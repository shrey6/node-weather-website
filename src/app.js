// const path = require('path')
// const express = require('express')
// const hbs = require('hbs')
// const app = express()
// // console.log(__dirname)
// // console.log(path.join(__dirname,'../public'))
// const publicDirectoryPath = path.join(__dirname,'../public')
// const viewsPath = path.join(__dirname,'../templates/views')
// const partialsPath = path.join(__dirname,'../templates/partials')
 
// app.set('view engine','hbs')
// app.set('views',viewsPath)
 
//  hbs.registerPartial(partialsPath)
//  app.use(express.static(publicDirectoryPath))
//  app.get('',(req,res)=>{
//     res.render('index',{
//         title:'Weather App',
//         name:'Andrew Mead' 
//     })
// })
// app.get('/help',(req,res)=>{
//     res.render('help',{
//         title:'Help Page',
//         helpText:'help me help you'
//     })
// })
// app.get('/about',(req,res)=>{
//     res.render('about',{
//     title:'About us',
//     name:'Andrew Mead' 
// })
// })
// app.get('/weather',(req,res)=>{
//     res.send({
//         forecast:'clear',
//         location:'philly'
//     })
// })



// port = 3000
// app.listen(port,()=>{
//     console.log('server up and running')
// })



const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:"please provide a valid address to continue"
        })
    }

    //     geocode(req.query.address,(err,{latitude,longitude,location})=>{
    //     if(err){
    //      return console.log('Error',err)
    //     }
    //     else{
    //     console.log('Data',data)
    //     console.log('latitude:',data.latitude)


    //     forecast(latitude,longitude,(err,forecastdata)=>{
    //         if(err){
    //         return console.log(err)
    //             }
    //             // else{
    //                 // console.log('Error',err)
    //                 res
    //                 console.log('Data',location)
    //             console.log('Data',forecastdata)
    //         // }
    //             // console.log('latitude:',data.latitude)
            
            
    //     })
    // }
    // })
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
            return res.send({error})
            }
       
            forecast(latitude,longitude,(error,forecastdata)=>{
                if(error){
                    return res.send({error})
                    }
            res.send({
                forecast:forecastdata,location,
                address:req.query.address
            })
            })



    // res.send({
    //     address: req.query.address,
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia'
    // })
}) })


app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "please provide search term"
        })
    }
    console.log(req.query)
    res.send({products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"Help article Not Found",
        msg:'page not found',
        name: 'Andrew Mead'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:"Not Found",
        msg:'page not found',
        name: 'Andrew Mead'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})