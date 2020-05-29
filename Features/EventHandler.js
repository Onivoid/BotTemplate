require('dotenv').config({
    path: 'config/.env'
});

const newMessage = require('./newMessage').newMessage;

module.exports = function eventHandler(Discord, client, msg) {
    if(msg.author.id != client.user.id){
        newMessage(Discord,client,msg);
    }
}

