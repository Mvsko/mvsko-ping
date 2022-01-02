//#▉#########################▶ Modules ◀########################▉#

console.clear()

const fs = require('fs');
const ConsoleTitle = require("node-bash-title");
const help = require("./commands/help")
const ping = require("./commands/ping")
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const db = require("quick.db")
const clc = require("cli-color")
const os = require("os")
const { SETTINGS } = require("./client/config")
const colorPing = require("./data/functions/colorPing")
const colorPrint = require("./data/functions/colorPrint")

db.set(`pingcoloroutput`, {color: "green"})

let c = {"color": "green"}
let timeout = {"time": "1000"}

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
                if (resp.startsWith(SETTINGS.APP.COMMAND + (" -c")) || resp.startsWith(SETTINGS.APP.COMMAND + (" --color"))){
                    if (args[2]){
                        let colors = ["red", "green", "cyan", "blue", "yellow", "magenta"]
                        if (isNaN(args[2])){
                            if (colors.includes(args[2])){
                                colorPing(args[2])
                            } else {
                                colorPrint(db.get(`pingcoloroutput.color`))
                            }
                        } else {
                            colorPrint(db.get(`pingcoloroutput.color`))
                        }
                    } else {
                        colorPrint(db.get(`pingcoloroutput.color`))
                    }
                }
                if (resp.startsWith(SETTINGS.APP.COMMAND + (" -t")) || resp.startsWith(SETTINGS.APP.COMMAND + (" --timeout"))){
                    if (!isNaN(args[2])){
                        if (5000 >= args[2] && args[2] >= 500){
                            timeout.time = `${args[2]}`
                            console.log(`The established time is now ` + clc.greenBright(args[2] + `ms`) + `.`)
                            console.log()
                        } else {
                            console.log("Please, insert an timeout beetween " + clc.yellowBright("500ms ") + "and " + clc.yellowBright("5000ms."))
                            console.log("The time already established is " + clc.yellowBright(timeout.time + "ms") + ".")
                            console.log()
                        }
                    } else {
                        console.log("Please insert a " + clc.yellowBright("number") + ".")
                        console.log()
                    }
                }
                if (resp.startsWith(SETTINGS.APP.COMMAND + (" -n")) || resp.startsWith(SETTINGS.APP.COMMAND + (" --nocolor"))) c.color = "undefined", console.log("The output is now without " + clc.yellowBright("color") + "."), console.log();
                if (args[3]){
                    if (args[2].includes("-p") && isNaN(args[3]) === false && args[1].includes(".")){
                        ping(args, args[1], args[3], c.color, timeout.time)
                        fs.watch('./client/cmds/history.yml', function (event, filename) {
                            if (event == 'change') {
                                setTimeout(() => {
                                    pingfc();
                                }, 2000);
                            }
                          });
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