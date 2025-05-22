




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0ExQ0liQzVuRnBlQmNCSnVYOEZIaFQ4NHRUaitvalN4bFRCUEhlb3FGUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMnc0UDhPcWxZODE1MFhzdnJOYWowT3dES2o4QlNHMUoyZzdvYklUU0NVST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnUFJhcjcrZnovMDV6NUZqdzJJTVphODdrb0ZyOHZjMmZudnladFFRZ1ZnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlMTJwbytuVHFrWWV0S1VoclFaa09IRmRmdGVWWndVWWpWdmpUR3lsMXdjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdLY0FLZUtJR1ZFTXY4RDl5L29uT284K04wNC8vUUlNWDlrSU9qUWRabXM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1DcjMwc2trZ0xnQkpkRGxQaG5jTWpLNXpTNkd0TTVyUlQrYS9YQmVIVmM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUdnZjFzd1pXMXNmVFdvUC93UXZKR0s2aFhrUTdFTE9aOW9pWVdrS2ozMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTU5MRTJDbjBGTEJwQ3QvY2d2bFZVem9jWWhoOTNwUXNUM3d0aE5RNk5UVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRnTGxkQWtlaExvdWpwcTdhcjMrd3I5QWtpQjhOVm5RRHY4SUV4dUVzY1lQZ2JvcllPY05LTkord3p6NjllelJKVGhJOXpqUUVJaWNSYktUSnVzSkFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTk0LCJhZHZTZWNyZXRLZXkiOiJNaHZpS1J1YWVmalIvV0ZlYlZURk02bE5ySzZyaHZ3OUlUVDZDVDVpeENjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI2Mzc4OTA4NTUzM0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIxQTk1MEM0QTY2ODA0NjI5RTE4OTZFQTIwOTEzOEExQyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ3OTQ2OTQyfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNjM3ODkwODU1MzNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNkY0M0Q2NzU3RjkyQTgxMDZFNERGRjUwNTI0MEFEOTUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0Nzk0Njk0M31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiOE0zRzdaRDIiLCJtZSI6eyJpZCI6IjI2Mzc4OTA4NTUzMzoyMEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwnZC38J2QuOKElfCdkLXwnZmK8J2RjCIsImxpZCI6IjEyMzkxODM5NjQ4NTg4MjoyMEBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09UTy9SWVFySnUrd1FZWUpDQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjdmODBUT0Vpcjl6cEFsekpYcDFSV2hNSjBKakF1K21CNTliWk1zcXUzaGs9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ikl5UGVuVHhtZDBlNnM3VFVXbU9IaGFSNThqL0QxRWYydlVUM0JwNXNBcHBnWHJDOUxWeDBlcmhZSUVGd1hPVEZpTW0wdjdISzVxV0RkbjE3M0VFdkJ3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJCQ015dUhRQlVOWXVlUStUSTFGMm94Umd5L2RZSzZscitjcEE0ZnlXMG1JdGdhQ2ROOHdVZmdaMUJ6ZXJmekhDcWN4Q0RoeCs3dXVLM1B6KzRmQTREQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc4OTA4NTUzMzoyMEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlMy9ORXpoSXEvYzZRSmN5VjZkVVZvVENkQ1l3THZwZ2VmVzJUTEtydDRaIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWdJQlE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDc5NDY5MzcsImxhc3RQcm9wSGFzaCI6IjJQMVloZiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBT3JOIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || 2637890855336",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "DENBOY",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'no',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  CHATBOT : process.env.CHATBOT || "no",
                  AUTO_BIO : process.env.AUTO_BIO || "no",
                  AUTO_REACT : process.env.AUTO_REACT || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
