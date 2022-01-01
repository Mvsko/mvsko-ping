const clc = require("cli-color")

module.exports = function colorOutput(c){
    if (c === "undefined") return clc.whiteBright(c)
    if (c === "magenta") return clc.magentaBright(c)
    if (c === "cyan") return clc.cyanBright(c)
    if (c === "yellow") return clc.yellowBright(c)
    if (c === "green" || c === "") return clc.greenBright(c)
    if (c === "blue") return clc.blueBright(c)
    if (c === "red") return clc.redBright(c)
}