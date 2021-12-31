const log = require("../data/log")
const { SETTINGS } = require("../client/config")

module.exports = function help() {
    log(`mkping v${SETTINGS.APP.VERSION} - Copyright (c) 2022 Mvsko`)
    log()
    log("Syntax: ping [options] destination")
    log()
    log("Options:")
    log(" -h,  --help      display usage")
    log(" -p,  --port N    set TCP port N (default 80)")
    log(" -c   --color     set color output (default green)")
    log("      --nocolor   Disable color output")
    log(" -t,  --timeout   timeout in milliseconds (default 1000)")
    log()
    log()
}