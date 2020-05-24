const request = require('request')
const forecast = (latitude,longitude,callback)=>{
    const url = "https://api.darksky.net/forecast/eaa53a91ac20e6eedc632ce3f2b79195/" + latitude + "," + longitude
    request({url,json:true},(err,{body})=>{
        if(err){
            callback("check your internet connection",undefined)
        }
        else if(body.error){
            callback('sahi location daal gandu',undefined)
        }
        else{
            callback(undefined,"Gaand phad garmi hori hai ."+body.daily.data[0].summary+'                           Abhi ka taapmaan :'+body.currently.temperature+' degree fahrenheit hai.                                  Aur baarish ka chance: '+body.currently.precipProbability+'% hai.                 Sabse upar ka tapman: '+ body.daily.data[0].temperatureHigh+' Sabse neecha ka tapman: '+ body.daily.data[0].temperatureLow+ '.              ............ HAAAAYEEE GARMIII!!!!..........')
    }
    })
}
module.exports=forecast