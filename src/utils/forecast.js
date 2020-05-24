const request = require('request')
const forecast = (latitude,longitude,callback)=>{
    const url = "https://api.darksky.net/forecast/eaa53a91ac20e6eedc632ce3f2b79195/" + latitude + "," + longitude
    request({url,json:true},(err,{body})=>{
        if(err){
            callback("check your internet connection",undefined)
        }
        else if(body.error){
            callback('unable to fetch your location',undefined)
        }
        else{
            callback(undefined,body.daily.data[0].summary+'it is currently '+body.currently.temperature+' degree celcius with '+body.currently.precipProbability+'% chance of rain')
    }
    })
}
module.exports=forecast