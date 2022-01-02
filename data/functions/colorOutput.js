const clc = require("cli-color")

module.exports = function colorOutput(c, v){
    if (c === "undefined") return clc.whiteBright(v)
    if (c === "magenta") return clc.magentaBright(v)
    if (c === "cyan") return clc.cyanBright(v)
    if (c === "yellow") return clc.yellowBright(v)
    if (c === "green" || c === "") return clc.greenBright(v)
    if (c === "blue") return clc.blueBright(v)
    if (c === "red") return clc.redBright(v)
}