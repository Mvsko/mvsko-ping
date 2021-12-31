const fs = require("fs")
const moment = require("moment")

module.exports = function cmdlogs(host, port){
  let datenow = moment(new Date()).format("DD/MM/YYYY")
  let timenow = moment().format("HH:mm:ss")
  let data = `Date: ${datenow} (${timenow})\nLast Command: ping ${host} -p ${port}`
  fs.writeFile("./client/cmds/logs.yml", data, (err) => {
      if (err) console.log(err);
    });
}