const axios = require('axios')
const {sms_api_id, sms_api_secret,sms_api_url, sms_from} = require('./config')

async function send_message(number="0500003941", message="Test message"){
    try { 

        let result = await axios({
            method: 'get',
            url: sms_api_url,
            params: {
                ClientId : sms_api_id,
                ClientSecret : sms_api_secret,
                From : sms_from,
                To : number,
                Content : message,
                RegisteredDelivery : 'true'
            }
        });
        
        return result.data
    } catch(err){
        console.error(err)
    }
}

module.exports = {
    send_message: send_message
}
// send_message()
// .then(res => console.log(res))