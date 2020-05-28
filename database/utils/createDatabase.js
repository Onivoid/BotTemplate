const Database = require('better-sqlite3');
const userDB = new Database('database/data/user.db', { verbose: console.log });
const userTable = require('./user/tables/general/index.js');


userDB.exec('CREATE TABLE IF NOT EXISTS users_infos (id INTEGER PRIMARY KEY)');



const addUserColumns = userDB.transaction((columns) => {
    for (column of columns) {
        userDB.exec(`ALTER TABLE users_infos ADD COLUMN ${column.name} ${column.type} ${column.constraint}`)
    };
});



try {
    addUserColumns(userTable.columns);
} catch (error) {
    return false;
}
