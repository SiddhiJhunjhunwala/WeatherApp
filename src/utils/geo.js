var request=require('request')

const geo=(address,callback)=>{
      const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2lkZGhpMTMwNyIsImEiOiJjazN6ZXA0MDIwMzh0M2VtdGdiZHZnN240In0.E8M-OoXJ8CgARilXbMMVnA&limit=1'
        
      request({url,json:true},(error,{body})=>{
   
        if(error){
          callback('Unable to connect',undefined)
        }
        else if(body.features.length===0){
            callback('Couldnt find the location',undefined)
        }
        else{
            callback(undefined,{
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                place: body.features[0].place_name
            }) 
            
        }

    })
}

module.exports=geo
