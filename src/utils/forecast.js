var request=require('request')

const forecast=(latitude,longitude,callback)=>{
    
    const url='https://api.darksky.net/forecast/adbf88a20208c97113e92820ff9a2eee/' + latitude +',' + longitude
    
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect',undefined)
        }
        else if(body.error){
            callback('Try another search',undefined)
        }
        else{
            callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    
    })
}

module.exports=forecast