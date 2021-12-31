var clc = require("cli-color");
const log = require("../data/log")
const fs = require("fs")
const moment = require("moment")
const { SETTINGS } = require("../client/config")
var tcpp = require('tcp-ping');
const db = require("quick.db");

const chist = require("../data/logs/cmdhistory")
const clogs = require("../data/logs/cmdlogs")

const colorOutput = require("../data/functions/colorOutput")
const randomNumber = require("../data/functions/randomNumber")
const numAverage = require("../data/functions/numAverage")
const getRandomNumberBetween = require("../data/functions/getRandomNumberBetween")

const msclc = []
var i = 0;
var ifail = 0;

module.exports = function ping(host, port, color){
    let ping = true;
    clogs(host, port)
    chist(host, port)
    log(`mkping v${SETTINGS.APP.VERSION} - Copyright (c) 2022 Mvsko`)
    log()
    log("Sending packets to " + clc.redBright(host) + " on " + clc.redBright("TCP", port) + ":")
    log()

    tcpp.probe(host, port, function(err, available) {
      if (!available) return log(clc.redBright("We can't resolve host, please verify again."))
      db.set(`${host}.available`, {host: true})
    })
    setTimeout(() => {
      if (db.get(`${host}.available`)){
        setInterval(() => {
          
          tcpp.ping({ address: host , port: port, attempts: 1}, function(err, data) {
            let promise = Promise.resolve();
            data.results.forEach(function(index){
              promise = promise
                .then(() => {
                  return new Promise((resolve) => {
                    setTimeout(function(){
                      ms = Math.round(index.time * 100) / 100;
                      i = i+1;
                      resolve(log("Connected to " + colorOutput(color, host) + ": time=" + colorOutput(color, ms + "ms") + " protocol=" + colorOutput(color, "TCP") + " port=" + colorOutput(color, port)));
                      msclc.push(`${ms}`)
                    }, randomNumber(1150)); 
                  })
        
                });
            })
        })
      }, 1000);
      }

    // var pcinterval1 = setInterval(() => {
    //     var pctimeout1 = setTimeout(() => {
    //         ping = false;
    //     }, randomNumber(8400, 18000));
    //     if (ping === true){
    //         ms1 = getRandomNumberBetween(30,80)
    //         ms2 = getRandomNumberBetween(1,100)
    //         log("Connected to " + colorOutput(color, host) + ": time=" + colorOutput(color, ms1 + "." + ms2 + "ms") + " protocol=" + colorOutput(color, "TCP") + " port=" + colorOutput(color, port))
    //         msclc.push(`${ms1}.${ms2}`)
    //         i = i + 1;
    //     } else {
    //         log(clc.redBright("Connection timed out"))
    //         ifail = ifail + 1;
    //         i = i + 1
    //     }
    // }, randomNumber(1000,1500));
    process.stdin.setRawMode(true);
    process.stdin.on("keypress", function(chunk, key) {
      if(key && key.name === "c" && key.ctrl) {
        log("Connected statistics:")
        log(`        Attempted = ` + clc.cyanBright(i) + ", Connected = " + clc.cyanBright(i - ifail) + ", Failed = " + clc.cyanBright(ifail + " ") + "(" + clc.cyanBright(Math.round((100 * (ifail / i) * 100) / 100) + "%") + ")")
        log("Approximate connection times:")
        log(`        Minimum = ` + clc.cyanBright(Math.min(...msclc)) + `ms, Maximum = ` + clc.cyanBright(Math.max(...msclc)) + `ms, Average = ` + clc.cyanBright(Math.round(numAverage(msclc) * 100) / 100) + `ms`)
        log()
        log()
        if (process === false) {
          process.exit()
        }
      }
    });
  }, 1500);
}