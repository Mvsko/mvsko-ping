//#▉#########################▶ Modules ◀########################▉#

const ConsoleTitle = require("node-bash-title");
// var clc = require("cli-color");
// var moment = require("moment");
// const fs = require ("fs");
// const prompt = ps({ sigint: true });
// const log = require("./data/log")
const help = require("./commands/help")
const ping = require("./commands/ping")
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const os = require("os")
const { SETTINGS } = require("./client/config")

let c = {"color": "green"}

//#▉##########################▶ Code ◀#########################▉#

ConsoleTitle('C:\\Windows\\system32\\cmd.exe')

function pingfc() {
    rl.question(os.homedir() + ">", function(resp) {
        const args = resp.split(" ")
        if (resp.includes("help") || resp.startsWith(SETTINGS.APP.COMMAND) || resp === "clear" || resp === "cls"){
            if (resp === "help" || resp === SETTINGS.APP.COMMAND + " -h" || resp === SETTINGS.APP.COMMAND + " --help") return help(), pingfc();
            if (resp === "clear" || resp === "cls"){
                console.clear()
                pingfc();
            }
            if (resp.startsWith(SETTINGS.APP.COMMAND)){
                if (resp === SETTINGS.APP.COMMAND) return help(), pingfc();
                if (resp.startsWith(SETTINGS.APP.COMMAND + (" -c") || resp.startsWith(SETTINGS.APP.COMMAND + (" --color")))){
                    if (args[2]){
                        if (args[2] === "cyan") c.color = "cyan";
                        if (args[2] === "red") c.color = "red";
                        if (args[2] === "green") c.color = "green";
                        if (args[2] === "blue") c.color = "blue";
                        if (args[2] === "yellow") c.color = "yellow";
                    } else {
                        console.log("Please, insert an existant color (red,green,cyan,blue,yellow,magenta).")
                        console.log("The color already established is green.")
                    }
                }
                if (resp.startsWith(SETTINGS.APP.COMMAND + (" -n") || resp.startsWith(SETTINGS.APP.COMMAND + (" --nocolor")))) c.color = "undefined";
                if (args[3]){
                    if (args[2].includes("-p") && isNaN(args[3]) === false && args[1].includes(".")){
                        ping(args[1], args[3], c.color)
                    } else {
                        help(), pingfc();
                    }
                } else {
                    pingfc();
                }
            }
        } else {
            pingfc();
        }
    })
}
pingfc()