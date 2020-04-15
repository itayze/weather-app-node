const request= require('postman-request')

const forecast=(lat,long,callback)=>{

const url='http://api.weatherstack.com/current?access_key=ddbdaa340d4ec9bd00a013c85a5923c5'+'&query='+lat+','+long+'&units=m'

request({url,json:true},(error,{body})=>{

    if(error)
    {
        callback('there was an error',undefined)
    }
    else if(body.success==false)
    {
        callback('we could not find ',undefined)
    }
    else
    {
        callback(undefined,{
            temperature:body.current.temperature,
            windSpeed:body.current.wind_speed,
            humidity:body.current.humidity
        })
    }


})


}

module.exports=forecast