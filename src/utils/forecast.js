const request = require('request')
const forecast = (latitude,longitude,callback)=>{
    const url = "https://api.darksky.net/forecast/eaa53a91ac20e6eedc632ce3f2b79195/" + latitude + "," + longitude
    request({url,json:true},(err,{body})=>{
        if(err){
            callback("check your internet connection",undefined)
        }
        else if(body.error){
            callback('Enter correct location',undefined)
        }
        else{
            callback(undefined,"Weather ."+body.daily.data[0].summary+'    temprature right now is :'+body.currently.temperature+' degree fahrenheit . Precipitation is : '+body.currently.precipProbability+'% .   Max Temperature: '+ body.daily.data[0].temperatureHigh+' Min Temperature: '+ body.daily.data[0].temperatureLow+ '.')
    }
    })
}
module.exports=forecast
