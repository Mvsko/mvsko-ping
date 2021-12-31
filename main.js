//#▉#########################▶ Modules ◀########################▉#

const ps = require("prompt-sync");
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

//#▉##########################▶ Code ◀#########################▉#

ConsoleTitle('C:\\Windows\\system32\\cmd.exe')

function pingfc() {
    rl.question(os.homedir() + ">", function(resp) {
        const args = resp.split(" ")
        if (resp.includes("help") || resp.includes("ping") || resp === "clear" || resp === "cls"){
            if (resp === "help") return help(), pingfc();
            if (resp === "clear" || resp === "cls"){
                console.clear()
                pingfc();
            }
            if (resp.startsWith("ping")){
                if (resp === "ping") return help(), pingfc();
                if (args[3]){
                    if (args[2].includes("-p") && isNaN(args[3]) === false && args[1].includes(".")){
                        ping(args[1], args[3])
                    } else {
                        help(), pingfc();
                    }
                } else {
                    help(), pingfc();
                }
            }
        } else {
            pingfc();
        }
    })
}
pingfc()