const clc = require("cli-color")
const db = require("quick.db")

module.exports = function colorPing(ci){
    let fc = db.set(`pingcoloroutput`, {color: ci});
    if (ci === "cyan") fc, console.log("The color " + clc.cyanBright(ci) + " is now use"), console.log();
    if (ci === "red") fc, console.log("The color " + clc.redBright(ci) + " is now use"), console.log();
    if (ci === "green") fc, console.log("The color " + clc.greenBright(ci) + " is now use"), console.log();
    if (ci === "blue") fc, console.log("The color " + clc.blueBright(ci) + " is now use"), console.log();
    if (ci === "yellow") fc, console.log("The color " + clc.yellowBright(ci) + " is now use"), console.log();
    if (ci === "magenta") fc, console.log("The color " + clc.yellowBright(ci) + " is now use"), console.log();
}