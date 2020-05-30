const Database = require('better-sqlite3');
const db = new Database('database/data/user.db');


module.exports = {
    update : (id,user) => {
        const data = db.prepare(`SELECT * FROM users_infos WHERE id = ?`).get(id);
        const insert = db.prepare(`\
            UPDATE users_infos \
            SET experience = @exp,\
                experience_timer = @expTimer,\
                level = @level,\
                reputation = @rep,\
                reputation_timer = @repTimer,\
                flood_counter = @floodCounter,
                warning = @warning\
            WHERE id = ${id}`);
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