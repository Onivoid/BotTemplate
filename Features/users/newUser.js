const Database = require('better-sqlite3');
const db = new Database('database/data/user.db');
const userCrud = require('../../database/utils/user/tables/general/index');

module.exports = {
    newUser: (Discord, client, msg) => {
        let userId = msg.author.id;
        let userExist = db.prepare(`SELECT * FROM users_infos WHERE user_id = ${userId}`).all().length;
        if(userExist < 1){
            userCrud.insert(new userCrud.UserInfos(userId, 0, 0, 0, 0, 0, 0, 0).toJSON())
        }
    }
}