//#▉#########################▶ Modules ◀########################▉#

const ConsoleTitle = require("node-bash-title");
const help = require("./commands/help")
const ping = require("./commands/ping")
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const clc = require("cli-color")
const os = require("os")
const { SETTINGS } = require("./client/config")

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
                        if (args[2] === "cyan") c.color = "cyan", console.log("The color " + clc.cyanBright(args[2]) + " is now use"), console.log();
                        if (args[2] === "red") c.color = "red", console.log("The color " + clc.redBright(args[2]) + " is now use"), console.log();
                        if (args[2] === "green") c.color = "green", console.log("The color " + clc.greenBright(args[2]) + " is now use"), console.log();
                        if (args[2] === "blue") c.color = "blue", console.log("The color " + clc.blueBright(args[2]) + " is now use, console.log()");
                        if (args[2] === "yellow") c.color = "yellow", console.log("The color " + clc.yellowBright(args[2]) + " is now use"), console.log();
                        if (args[2] === "magenta") c.color = "magenta", console.log("The color " + clc.yellowBright(args[2]) + " is now use"), console.log();
                    } else {
                        console.log("Please, insert an existant color (" + clc.redBright("red") + "," + clc.greenBright("green") + "," + clc.cyanBright("cyan") + "," + clc.blueBright("blue") + "," + clc.yellowBright("yellow") + "," + clc.magentaBright("magenta") + ").")
                        console.log("The color established is " + clc.redBright(c.color) + ".")
                        console.log()
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
                        ping(args[1], args[3], c.color, timeout.time)
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