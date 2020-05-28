const Database = require('better-sqlite3');
const userDB = new Database('database/data/user.db', { verbose: console.log });

module.exports ={
    insert : (user) => {
        const insert = userDB.prepare(`\
            INSERT INTO users_infos (user_id, experience, experience_timer, level, reputation, reputation_timer, flood_counter, warning)\
            VALUES (@userId, @exp, @expTimer, @level, @rep, @repTimer, @floodCounter, @warning)`
        );
    
        insert.run(user);

        const changes = userDB.prepare(`SELECT * FROM users_infos WHERE user_id = ${user.userId}`).all();
        console.log(changes);
    }
}