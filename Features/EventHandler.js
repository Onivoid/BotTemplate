require('dotenv').config({
    path: 'config/.env'
});

const newUser = require('./users/newUser').newUser;
const statsUser = require('./users/statsUser').statsUser;

module.exports = function eventHandler(Discord, client, msg) {
    if(msg.author.id != client.user.id){
        newUser(Discord, client, msg);
        if(msg.content.includes('!stats')){
            statsUser(Discord, client, msg);
        }
    }
}

