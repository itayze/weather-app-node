const express= require('express')
const app= express()
const path=require('path')
const hbs=require('hbs')
const geocode= require('./utils/geocode')
const forecast= require ('./utils/forecast')


//define paths for static and views
const publicPath=path.join(__dirname,'../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialsPath= path.join(__dirname,'../templates/partials')


//setup handlebars and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//setup static folder to serve
app.use(express.static(publicPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'wheather app',
        name:'itay zecharia'
    })
})

app.get('/about',(req,res)=>{
    
    res.render('about',{
        title:'about page',
        name:'itay'
    })
    
})

app.get('/help',(req,res)=>{

    res.render('help',{
        title:'dynamic created',
        name:'itay'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.adress)
    {
        return res.send({
            error:'you must provide an adress'
        })
    }

    geocode(req.query.adress,(error,{latitude,longitude}={})=>{

        if(error)
        {
            return res.send({error})
        }
        forecast(latitude,longitude,(error,{temperature,windSpeed})=>
    {   
        if(error)
        {
            return res.send({error})
        }
        
    res.send({
        forecast:temperature,
        windSpeed,
        adress:req.query.adress

    })
    })  
    })


 
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMessage:'help page was not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage:'page wasnt found.'
    })
})

app.listen(3000,()=>{
    console.log('server is running')
})
