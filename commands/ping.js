var clc = require("cli-color");
const log = require("../data/log")
const fs = require("fs")
const moment = require("moment")
const { SETTINGS } = require("../client/config")
var tcpp = require('tcp-ping');
const db = require("quick.db");
const { exec } = require('child_process');
const ConsoleTitle = require("node-bash-title");

const chist = require("../data/logs/cmdhistory")
const clogs = require("../data/logs/cmdlogs")

const colorOutput = require("../data/functions/colorOutput")
const randomNumber = require("../data/functions/randomNumber")
const numAverage = require("../data/functions/numAverage")
const getRandomNumberBetween = require("../data/functions/getRandomNumberBetween");
const { exit } = require("process");

const msclc = []
var i = 0;
var ifail = 0;

module.exports = function ping(host, port, color, timeout){
    let ping = true;
    ConsoleTitle(`C:\\Windows\\system32\\cmd.exe - ping ${host} -p ${port}`)
    clogs(host, port)
    log(`mkping v${SETTINGS.APP.VERSION} - Copyright (c) 2022 Mvsko`)
    log()
    log("Sending packets to " + clc.redBright(host) + " on " + clc.redBright("TCP", port) + ":")
    log()

    tcpp.probe(host, port, function(err, available) {
      if (!available){
        log(clc.redBright("We can't resolve host, please verify again"))
        db.set(`${host}.available`, {host: false})
      } else {
        db.set(`${host}.available`, {host: true})
      }
    })
    setTimeout(() => {
      if (db.get(`${host}.available.host`) === true){
        setInterval(() => {
          if (ping === true){
            try {
              tcpp.ping({ address: host , port: port, attempts: 1}, function(err, data) {
                if (err) log(err)
                let promise = Promise.resolve();
                data.results.forEach(function(index){
                  promise = promise
                    .then(() => {
                      return new Promise((resolve) => {
                        setTimeout(function(){
                          ms = Math.round(index.time * 100) / 100;
                          i = i+1;
                          if (ping === true){
                            if (ms > timeout || ms === NaN){
                              resolve(log(clc.redBright("Connection timed out")))
                              setTimeout(() => {
                                ifail = ifail + 1;
                              }, 250);
                            } else {
                              resolve(log("Connected to " + colorOutput(color, host) + ": time=" + colorOutput(color, ms + "ms") + " protocol=" + colorOutput(color, "TCP") + " port=" + colorOutput(color, port)));
                              msclc.push(`${ms}`)
                            }
                        }
                        }, randomNumber(700,1000)); 
                      })
            
                    });
                })
            })
            } catch (e) {
              log(clc.redBright("Connection timed out"))
              setTimeout(() => {

              }, 1000);
            }
        }
      }, 1000);
      }
    process.stdin.setRawMode(true);
    process.stdin.on("keypress", function(chunk, key) {
      if(key && key.name === "c" && key.ctrl) {
        let connected = i - ifail;;
        let fail = ifail + " ";
        let prcfail = Math.round((100 * (ifail / i) * 100) / 100) + "%";
        let min = Math.min(...msclc);
        let max = Math.max(...msclc);
        let average = Math.round(numAverage(msclc) * 100) / 100;
        log("Connected statistics:")
        log(`        Attempted = ` + clc.cyanBright(i) + ", Connected = " + clc.cyanBright(connected) + ", Failed = " + clc.cyanBright(fail) + "(" + clc.cyanBright(prcfail) + ")")
        log("Approximate connection times:")
        log(`        Minimum = ` + clc.cyanBright(min) + `ms, Maximum = ` + clc.cyanBright(max) + `ms, Average = ` + clc.cyanBright(average) + `ms`)
        log()
        log()
        chist(host, port, i, connected, fail, prcfail, max, min, average)
        ping = false;
        if (process === false) {
          process.exit()
        }
      }
    });
  }, 100);
}