const Database = require('better-sqlite3');
const db = new Database('database/data/user.db');
const userCrud = require('../../database/utils/user/tables/general/index');

function getRandomInt(min,max) {
    return Math.floor(Math.random() * Math.floor(max - min)+min);
}

module.exports = {
    giveXP: (id) => {
        let userInfos = db.prepare(`SELECT * FROM users_infos WHERE id = ?`).get(id);
        let howMuchXP = getRandomInt(15,30);
        let expTimer = userInfos.experience_timer;
        let expGainAllowed = Math.floor((Date.now() - expTimer) / 1000) > 1 || expTimer === 0;
        let newLevel = userInfos.experience >= userInfos.level * 80 || userInfos.experience + howMuchXP >= userInfos.level * 80;
        let userGainExp = new userCrud.UserInfos(
                userInfos.user_id,
                userInfos.experience + howMuchXP,
                Date.now(),
                userInfos.level,
                userInfos.reputation,
                userInfos.reputation_timer,
                userInfos.flood_counter,
                userInfos.warning
            ).toJSON();

        let userGainLevel = new userCrud.UserInfos(
                userInfos.user_id,
                0 + howMuchXP,
                Date.now(),
                userInfos.level + 1,
                userInfos.reputation,
                userInfos.reputation_timer,
                userInfos.flood_counter,
                userInfos.warning
            ).toJSON();

        if (expGainAllowed && !newLevel) {
            console.log('a')
            userCrud.update(userInfos.id, userGainExp);
        } else if (expGainAllowed && newLevel) {
            console.log('b')
            userCrud.update(userInfos.id, userGainLevel);
        }
    }
}