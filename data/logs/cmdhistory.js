const fs = require("fs")
const moment = require("moment")
const { SETTINGS } = require("../../client/config")

module.exports = function cmdhistory(host, port, attempts, connected, fail, prcfail, max, min, average){
  let datenow = moment(new Date()).format("DD/MM/YYYY")
  let timenow = moment().format("HH:mm:ss")
  let data = `[${SETTINGS.APP.NAME} ${SETTINGS.APP.VERSION}]\n  - Command: ${SETTINGS.APP.COMMAND} ${host} -p ${port}\n    • IP: ${host}\n    • Port: ${port}\n    • Attempts: ${attempts}\n    • Connected: ${connected}\n    • Failed: ${fail} (${prcfail}%)\n    • Max: ${max}ms\n    • Min: ${min}ms\n    • Average: ${average}ms\n  - Date: ${datenow} (${timenow})\n  - Rank: ${SETTINGS.USER.RANK}\n`
  fs.appendFile("./client/cmds/history.yml", data, (err) => {
      if (err) console.log(err);
    });
}