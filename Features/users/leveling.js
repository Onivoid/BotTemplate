require('dotenv').config({
    path: 'config/.env'
});

const Database = require('better-sqlite3');
const db = new Database('database/data/user.db');
const userCrud = require('../../database/utils/user/tables/general/index');

const xpMin = process.env.XP_MIN;
const xpMax = process.env.XP_MAX;
const xpTimer = process.env.XP_TIMER;
const levelTier = process.env.LEVEL_TIER;
const levelMultiplicator = process.env.LEVEL_MULTIPLICATOR;

const getRandomInt = (min,max) => {
    return Math.floor(Math.random() * Math.floor(max - min)+min);
};

module.exports = {
    giveXP: (id) => {
        let userInfos = db.prepare(`SELECT * FROM users_infos WHERE id = ?`).get(id);
        let howMuchXP = getRandomInt(xpMin,xpMax);
        let expTimer = userInfos.experience_timer;
        let expGainAllowed = Math.floor((Date.now() - expTimer) / 1000) > xpTimer || expTimer === 0;
        let newLevel = userInfos.experience + howMuchXP >= (userInfos.level * levelMultiplicator) * levelTier +  ((userInfos.level - 1) * levelMultiplicator) * levelTier;
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
                userInfos.experience + howMuchXP,
                Date.now(),
                userInfos.level + 1,
                userInfos.reputation,
                userInfos.reputation_timer,
                userInfos.flood_counter,
                userInfos.warning
            ).toJSON();

        if (expGainAllowed && !newLevel) {
            userCrud.update(userInfos.id, userGainExp);
        } else if (expGainAllowed && newLevel) {
            userCrud.update(userInfos.id, userGainLevel);
        }
    }
}