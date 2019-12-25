const path=require('path')
const express=require('express')
hbs=require('hbs')
const geo=require('./utils/geo')
const forecast=require('./utils/forecast')

const app=express()

const publicDirectoryPath = path.join(__dirname, '../public') 
const viewPath=path.join(__dirname,'../templates/views')
const partial=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partial)

app.use(express.static(publicDirectoryPath))


app.get('',(req,res) => {
    res.render('index',{
        title:"Welcome to the",
        name:"Siddhi"
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        name:"Siddhi",
        title:"About"
    })
})

app.get('/contact',(req,res) => {
    
    res.render('contact',{
        message:" All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        title:"Contact",
        name:"Siddhi"
    })
})

app.get('/weather',(req,res) => {
    const value=req.query.address
    if(!value){
        return res.send({
            error:"Provide an address"
        })
    }
    
    geo(value,(error,{ latitude, longitude, place}={}) => {
        if(error){
           return res.send({error})
        }
        
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            
            res.send({
                location:place,
                forecast:forecastData
            })
    
        })
    })

   
})

app.get('*',(req,res) => {
    res.render('what',{
        title:"Error 404",
        name:"Siddhi",
        message:"Page not found"
    })
})

app.listen(3000,() => {
    console.log("Server is up at 3000")
})



