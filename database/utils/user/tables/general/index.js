const   columns = require('./columns.json'),
        UserInfos = require('./userClass'),
        insert = require('./insert').insert,
        update = require('./update').update;

module.exports = {columns, UserInfos, insert, update};