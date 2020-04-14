const request= require('postman-request')


const geocode=(adress,callback)=>
{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(adress)+'.json?access_token=pk.eyJ1IjoiaXRheXplIiwiYSI6ImNrOG84eWU3OTAwb2gzbG95b2tqeDZubTMifQ.Y9pkCECDr3lWn_0XtyVNrQ&limit=1'

    request({url,json:true},(error,{body})=>
    {
        if(error)
        {
            callback('error occured',undefinded)
        }
        else if(body.features.length==0)
        {
            callback('could not find this address', undefined)
        }
        else
        {
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports=geocode