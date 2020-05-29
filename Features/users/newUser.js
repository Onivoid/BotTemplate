const Database = require('better-sqlite3');
const db = new Database('database/data/user.db');
const userCrud = require('../../database/utils/user/tables/general/index');

module.exports = {
    newUser: (userId) => {
        userCrud.insert(new userCrud.UserInfos(userId, 0, 0, 1, 0, 0, 0, 0).toJSON())
    }
}