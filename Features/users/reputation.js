const Database = require('better-sqlite3');
const db = new Database('database/data/user.db');
const userCrud = require('../../database/utils/user/tables/general/index');

function getRandomInt(min,max) {
    return Math.floor(Math.random() * Math.floor(max - min)+min);
}

module.exports = {
    giveRep: (Discord, client, msg) => {
        let usersIds = msg.mentions.users.map((user) => user.id)

        /*let userLooseRep = new userCrud.UserInfos(
                userInfos.user_id,
                userInfos.experience,
                userInfos.experience_timer,
                userInfos.level,
                userInfos.reputation + 1,
                Date.now(),
                userInfos.flood_counter,
                userInfos.warning
            ).toJSON();*/

        usersIds.map(userId => {
            let userInfos = db.prepare(`SELECT * FROM users_infos WHERE user_id = ${userId}`).get();
            let repTimer = userInfos.reputation_timer;
            let repGainAllowed = Math.floor((Date.now() - repTimer) / 1000) > 1 || repTimer === 0;
            let userGainRep = new userCrud.UserInfos(
                    userInfos.user_id,
                    userInfos.experience,
                    userInfos.experience_timer,
                    userInfos.level,
                    userInfos.reputation + 1,
                    Date.now(),
                    userInfos.flood_counter,
                    userInfos.warning
            ).toJSON();

            if (repGainAllowed && userId != msg.author.id) {
                userCrud.update(userGainRep);
            }
        }) 
    }
}