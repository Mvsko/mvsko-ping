const colorOutput = require("./colorOutput")
const db = require("quick.db")
const clc = require("cli-color")

module.exports = function colorPrint(x){
    console.log("Please, insert an existant color (" + clc.redBright("red") + "," + clc.greenBright("green") + "," + clc.cyanBright("cyan") + "," + clc.blueBright("blue") + "," + clc.yellowBright("yellow") + "," + clc.magentaBright("magenta") + ").")
    console.log("The color established is " + colorOutput(x) + ".")
    console.log()
}