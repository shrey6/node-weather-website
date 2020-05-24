const request =require('request')
const geocode = (address,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1Ijoic2hyZXkxIiwiYSI6ImNrMTJjYW4ydTBudzUzam81ZTFqOWhuYWIifQ.7-7i41StLO5C0h3IWmy20g&limit=1"  
    request({url,json:true},(err,{body})=>{
        if(err){
            callback('unable to connect to location service',undefined)
        } else if(body.features.length===0){
            callback('unable to find location',undefined)
        }
        else{
            callback(undefined,
            {
               latitude:body.features[0].center[1],
               longitude:body.features[0].center[0],
               location:body.features[0].place_name
            })
        }
    })
} 
module.exports =geocode