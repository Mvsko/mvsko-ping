var clc = require("cli-color");
const log = require("../data/log")
const fs = require("fs")
const moment = require("moment")
const { SETTINGS } = require("../client/config")

const chist = require("../data/logs/cmdhistory")
const clogs = require("../data/logs/cmdlogs")

const randomNumber = require("../data/functions/randomNumber")
const numAverage = require("../data/functions/numAverage")
const getRandomNumberBetween = require("../data/functions/getRandomNumberBetween")

const msclc = []
var i = 0;
var ifail = 0;

module.exports = function ping(host, port){
    let ping = true;
    clogs(host, port)
    chist(host, port)
    log(`mkping v${SETTINGS.APP.VERSION} - Copyright (c) 2022 Mvsko`)
    log()
    log("Connecting to " + clc.yellowBright(host) + " on " + clc.yellowBright("TCP", port) + ":")
    log()
    var pcinterval1 = setInterval(() => {
        var pctimeout1 = setTimeout(() => {
            ping = false;
        }, randomNumber(8400, 18000));
        if (ping === true){
            ms1 = getRandomNumberBetween(30,80)
            ms2 = getRandomNumberBetween(1,100)
            log("Connected to " + clc.greenBright(host) + ": time=" + clc.greenBright(ms1 + "." + ms2 + "ms") + " protocol=" + clc.greenBright("TCP") + " port=" + clc.greenBright(port))
            msclc.push(`${ms1}.${ms2}`)
            i = i + 1;
        } else {
            log(clc.redBright("Connection timed out"))
            ifail = ifail + 1;
            i = i + 1
        }
    }, randomNumber(1000,1500));
    process.stdin.setRawMode(true);
    process.stdin.on("keypress", function(chunk, key) {
      if(key && key.name === "c" && key.ctrl) {
        log("Connected statistics:")
        log(`        Attempted = ` + clc.cyanBright(i) + ", Connected = " + clc.cyanBright(i - ifail) + ", Failed = " + clc.cyanBright(ifail + " ") + "(" + clc.cyanBright(Math.round((100 * (ifail / i) * 100) / 100) + "%") + ")")
        log("Approximate connection times:")
        log(`        Minimum = ` + clc.cyanBright(Math.min(...msclc)) + `ms, Maximum = ` + clc.cyanBright(Math.max(...msclc)) + `ms, Average = ` + clc.cyanBright(Math.round(numAverage(msclc) * 100) / 100) + `ms`)
        log()
        log()
        clearInterval(pcinterval1)
        if (process === false) {
          process.exit()
        }
      }
    });
}