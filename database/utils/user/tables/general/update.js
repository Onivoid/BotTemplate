const Database = require('better-sqlite3');
const userDB = new Database('database/data/user.db');


module.exports = {
    update : (user) => {
        const data = userDB.prepare(`SELECT * FROM users_infos WHERE user_id = ${user.userId}`).get();
        const insert = userDB.prepare(`\
            UPDATE users_infos \
            SET experience = @exp,\
                experience_timer = @expTimer,\
                level = @level,\
                reputation = @rep,\
                reputation_timer = @repTimer,\
                flood_counter = @floodCounter,
                warning = @warning\
            WHERE user_id = ${user.userId}`);
        insert.run({
            exp: user.exp || data.experience,
            expTimer: user.expTimer || data.experience_timer,
            level: user.level || data.level,
            rep: user.rep || data.reputation,
            repTimer: user.repTimer || data.reputation_timer,
            floodCounter: user.floodCounter || data.flood_counter,
            warning: user.warning || data.warning
        })
    }
}