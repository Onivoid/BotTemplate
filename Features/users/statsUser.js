require('dotenv').config({
    path: 'config/.env'
});

const Database = require('better-sqlite3');
const db = new Database('database/data/user.db');

const levelTier = process.env.LEVEL_TIER
const levelMultiplicator = process.env.LEVEL_MULTIPLICATOR

module.exports = {
    statsUser: (Discord, client, msg) => {
        if (msg.mentions.users.map((user) => user).length > 0){
            let usersMentionned = msg.mentions.users.map((user) => {return {"id": user.id, "name": `${user.username}#${user.discriminator}`, "avatarURL": user.avatarURL}});
            usersMentionned.map(user => {
                let data = db.prepare(`SELECT * FROM users_infos WHERE user_id = ${user.id}`).all();
                let userExist = data.length;
                if (userExist === 1) {
                    let stats = data[0];
                    let nextLevel = ((stats.level * levelMultiplicator) * levelTier +  ((stats.level - 1) * levelMultiplicator) * levelTier) - stats.experience
                    const content = `\
                    **Experience** : ${stats.experience}xp \n
                    **Level** : ${stats.level} ( *${nextLevel}xp left for level ${stats.level + 1}* )\n
                    **Reputation** : ${stats.reputation}\
                    `
                    const embed = new Discord.RichEmbed()
                        .setColor('#E6CBA1')
                        .setAuthor(`${user.name}`, user.avatarURL)
                        .setThumbnail(user.avatarURL)
                        .addField('\u200b', content)
                        .addBlankField()
                        .setTimestamp()
                        .setFooter(client.user.username, client.user.avatarURL);
                    msg.channel.send(embed)
                }
            });
        } else {
            let userId = msg.author.id;
            let data = db.prepare(`SELECT * FROM users_infos WHERE user_id = ${userId}`).all();
            let userExist = data.length;
            if (userExist === 1) {
                let stats = data[0];
                let nextLevel = ((stats.level * levelMultiplicator) * levelTier +  ((stats.level - 1) * levelMultiplicator) * levelTier) - stats.experience
                const content = `\
                **Experience** : ${stats.experience}xp \n
                **Level** : ${stats.level} ( *${nextLevel}xp left for level ${stats.level + 1}* )\n
                **Reputation** : ${stats.reputation}\
                `
                const embed = new Discord.RichEmbed()
                    .setColor('#E6CBA1')
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
}