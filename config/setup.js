const fs = require('fs');
const readline = require("readline");
const colors = require('colors');

let envData = (token, botStatus, xpMin, xpMax, xpTimer, levelTier, levelMultiplicator) => `\
BOT_TOKEN = "${token}"
BOT_STATUS = "${botStatus}"
XP_MIN = "${xpMin}"
XP_MAX = "${xpMax}"
XP_TIMER = "${xpTimer}"
LEVEL_TIER = "${levelTier}"
LEVEL_MULTIPLICATOR = "${levelMultiplicator}"
`;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("\nBot's token : ".green, token => {
    rl.question("Bot's status (ex : Beodara): ".green, botStatus => {
        rl.question("Minimum XP reward (ex : 20): ".green, xpMin => {
            rl.question("Maximum XP reward (ex : 50) : ".green, xpMax => {
                rl.question("XP Timer in seconds (ex : 15) : ".green, xpTimer => {
                    rl.question("Level tier XP (ex : 100) : ".green, levelTier => {
                        rl.question("Level multiplicator (ex : 1.5) : ".green, async levelMultiplicator => {
                            let data = envData(token, botStatus, xpMin, xpMax, xpTimer, levelTier, levelMultiplicator);
                            await fs.writeFile('./config/.env', data, (err) => {
                                if (err) throw err;
                                rl.close();
                            });
                        });
                    });
                });
            });
        });
    });
});

rl.on("close", function() {
    console.log("\nThe Beodara's bot was succefully configured !\n".green);
    process.exit(0);
});