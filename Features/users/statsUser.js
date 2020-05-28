const Database = require('better-sqlite3');
const db = new Database('database/data/user.db');
const userCrud = require('../../database/utils/user/tables/general/index');

module.exports = {
    statsUser: (Discord, client, msg) => {
        let userId = msg.author.id;
        let data = db.prepare(`SELECT * FROM users_infos WHERE user_id = ${userId}`).all();
        let userExist = data.length;
        if (userExist === 1) {
            let stats = data[0];
            console.log(stats)
            const content = `\
            **Experience** : ${stats.experience}xp \n
            **Level** : ${stats.level} \n
            **Reputation** : ${stats.reputation}\
            `
            const embed = new Discord.RichEmbed()
                .setColor('#0099ff')
                .setAuthor(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
                .setThumbnail(msg.author.avatarURL)
                .addField('\u200b', content)
                .addBlankField()
                .setTimestamp()
                .setFooter(client.user.username, client.user.avatarURL);
            msg.channel.send(embed)
        }
    }
}