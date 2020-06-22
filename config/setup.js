const fs = require('fs');
const readline = require("readline");
const colors = require('colors');

let envData = (token, botStatus) => `\
BOT_TOKEN = "${token}"
BOT_STATUS = "${botStatus}"
`;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("\nBot's token : ".green, token => {
    rl.question("Bot's status (ex : Beodara): ".green, async botStatus => {
        let data = envData(token, botStatus);
        await fs.writeFile('./config/.env', data, (err) => {
            if (err) throw err;
            rl.close();
        });
    });
});

rl.on("close", function() {
    console.log("\nThe bot's config was succefully configured !\n".green);
    process.exit(0);
});