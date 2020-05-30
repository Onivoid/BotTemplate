const Database = require('better-sqlite3');
const db = new Database('database/data/user.db');
const userCrud = require('../database/utils/user/tables/general/index');

const giveXP = require('./users/leveling.js').giveXP;
const newUser = require('./users/newUser').newUser;
const statsUser = require('./users/statsUser').statsUser;
const giveRep = require('./users/reputation').giveRep;


module.exports = {
    newMessage: (Discord, client, msg) => {
        let userId = msg.author.id;
        let userExist = db.prepare(`SELECT * FROM users_infos WHERE user_id = ${userId}`).all().length;
        if(userExist < 1){
            newUser(userId);
        } else if (userExist === 1) {
            giveXP(userId);
            let command = msg.content.split(' ')[0];
            switch (command) {
                case `!stats`:
                    statsUser(Discord, client, msg);
                    break;
                case `!rep`:
                    if(msg.mentions.users.map((user) => user).length > 0){
                        giveRep(Discord, client, msg);
                    }
                    break;
                default:
                    break;
            }
        }
    }
}